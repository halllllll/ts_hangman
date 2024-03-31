/**
 * Message
 */

import type { Question } from '../intefaces/Question.js';
import type UserInterface from '../intefaces/UserInteface.js';
import type { Quiz } from './Quiz.js';
import type { Stage } from './Stage.js';

export class Message {
  ui: UserInterface;

  constructor(ui: UserInterface) {
    this.ui = ui;
  }

  askQuestion(stage: Stage): void {
    this.ui.output(`Hint: ${stage.question.hint}`, 'yellow');
    this.ui.outputAnswer(stage.answer.replaceAll('', ' ').trim());
    this.ui.output(`(rest challenge count: ${stage.leftAttempts})`);
  }

  leftQuestion(quiz: Quiz) {
    this.ui.output(`rest quiz count: ${quiz.lefts() + 1}`);
  }
  start() {
    this.ui.output('\nGame Start!');
  }
  enterSomething() {
    this.ui.output('なにか文字を入力してください', 'red');
  }
  notInclude(input: string) {
    this.ui.output(`"${input}"は単語に含まれていません`, 'red');
  }
  notCorrect(input: string) {
    this.ui.output(`OMG! "${input}" is not correct`, 'red');
  }
  hit(input: string) {
    this.ui.output(`${input} がヒット!`, 'green');
  }
  correct(question: Question) {
    this.ui.output(`正解！ ${question.word}`, 'green');
  }

  gameover(question: Question) {
    this.ui.output(`正解は ${question.word} でした`);
  }
  end() {
    this.ui.output('ありがとうございました〜');
  }
}
