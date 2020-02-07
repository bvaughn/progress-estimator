import { Chalk } from 'chalk';

declare namespace progressEstimator {
  interface Spinner {
    interval: number;
    frames: string[];
  }

  interface ChalkTheme extends Chalk {
    asciiCompleted: Chalk;
    asciiInProgress: Chalk;
    estimate: Chalk;
    estimateExceeded: Chalk;
    label: Chalk;
    percentage: Chalk;
    progressBackground: Chalk;
    progressForeground: Chalk;
  }

  interface LogFunction {
    (...text: string[]): void;
    clear(): void;
    done(): void;
  }

  interface Configuration {
    logFunction?: LogFunction;
    spinner?: Spinner;
    storagePath?: string;
    theme?: ChalkTheme;
  }

  interface LogOption {
    estimate?: number;
    id?: string;
  }

  interface ProgressEstimator {
    <T>(promise: Promise<T>, label: string, options?: LogOption): Promise<T>;
  }
}

declare function progressEstimator(
  config?: progressEstimator.Configuration
): progressEstimator.ProgressEstimator;

export = progressEstimator;
