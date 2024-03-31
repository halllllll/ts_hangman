import type { Question } from '../intefaces/Question.js';

/**
 * Stage
 */
export class Stage {
  answer: string;
  leftAttempts = 5;
  question: Question;
  constructor(question: Question) {
    this.question = question;
    this.answer = new Array(question.word.length).fill('_').join('');
  }

  updateAnswer(userInput = ''): void {
    if (!userInput) return;
    const regex = new RegExp(userInput, 'g');
    const answerArry = this.answer.split('');

    let matches: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((matches = regex.exec(this.question.word))) {
      const idx = matches.index;
      answerArry.splice(idx, userInput.length, ...userInput);
      this.answer = answerArry.join('');
    }
  }

  isTooLong(userInput: string): boolean {
    return userInput.length > this.question.word.length;
  }

  isIncludes(userInput: string): boolean {
    return this.question.word.includes(userInput);
  }

  isCorrect(): boolean {
    return this.answer === this.question.word;
  }

  decrementAttempts(): number {
    return --this.leftAttempts;
  }

  isGameOver(): boolean {
    return this.leftAttempts === 0;
  }
}
