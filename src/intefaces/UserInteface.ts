/**
 * User Interface
 * CLI Game
 */
export type Color = 'red' | 'green' | 'yellow' | 'white';

export default interface UserInterface {
  input(): Promise<string>;
  clear(): void;
  destroy(): void;
  output(message: string, color?: Color): void;
  outputAnswer(message: string): void;
}
