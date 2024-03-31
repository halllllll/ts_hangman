import rawData from './data/question.test.json';
import type { Question } from './intefaces/Question.js';
import Game from './models/Game.js';
import { Message } from './models/Message.js';
import { Quiz } from './models/Quiz.js';
import { CLI } from './utils/CLI.js';

const questions: Question[] = rawData;
const quiz = new Quiz(questions);
const message = new Message(CLI);
const game = new Game(quiz, message, CLI);

game.start();
