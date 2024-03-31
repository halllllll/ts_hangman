import type { Stage } from '../models/Stage.js';

export default interface GameState {
  stage: Stage;
  done: boolean;
}
