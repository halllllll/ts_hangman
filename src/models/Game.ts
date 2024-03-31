/**
 * Game
 */

import type GameState from '../intefaces/GameState.js';
import type UserInterface from '../intefaces/UserInteface.js';
import type { Message } from './Message.js';
import type { Quiz } from './Quiz.js';
import { Stage } from './Stage.js';

export default class Game {
  quiz: Quiz;
  message: Message;
  stage: Stage;
  ui: UserInterface;

  constructor(quiz: Quiz, message: Message, ui: UserInterface) {
    this.quiz = quiz;
    this.message = message;
    this.ui = ui;
    this.stage = new Stage(this.quiz.getNext());
  }

  async start(): Promise<void> {
    this.ui.clear();
    this.message.start();
    let state: GameState = {
      stage: this.stage,
      done: false,
    };

    while (!state.done) {
      // 終了処理（異常ではない）
      if (state.stage === undefined) break;

      const { stage } = state;
      this.message.leftQuestion(this.quiz);
      this.message.askQuestion(stage);

      const userInput = await this.ui.input();
      if (!userInput) {
        this.message.enterSomething();
        // 不正解として扱う
        state = this.next(false);
        continue;
      }
      stage.updateAnswer(userInput);

      if (stage.isCorrect()) {
        this.message.correct(stage.question);
        state = this.next(true);
        continue;
      }

      if (stage.isTooLong(userInput)) {
        this.message.notCorrect(userInput);
        state = this.next(false);
        continue;
      }

      if (stage.isIncludes(userInput)) {
        this.message.hit(userInput);
        continue;
      }
      // 何もヒットしない
      this.message.notInclude(userInput);
      state = this.next(false);
    }

    if (state.stage.isGameOver()) {
      this.message.gameover(this.stage.question);
    }
    this.message.end();
    this.ui.destroy();
  }

  shouldEnd(): boolean {
    if (this.stage.isGameOver()) {
      return true;
    }
    if (!this.quiz.hasNext() && this.stage.isCorrect()) {
      return true;
    }
    return false;
  }

  next(isCorrect: boolean): GameState {
    if (!isCorrect) {
      this.stage.decrementAttempts();
    }
    if (this.shouldEnd()) {
      return { stage: this.stage, done: true };
    }
    if (isCorrect) {
      this.stage = new Stage(this.quiz.getNext());
    }
    return { stage: this.stage, done: false };
  }
}
