/**
 * Simple logger utility for test execution
 * Provides colored console output for different log levels
 */

enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

class Logger {
  private logLevel = process.env.LOG_LEVEL || 'INFO';

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel as any);
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp();
    let output = `[${timestamp}] [${level}] ${message}`;
    if (data) {
      output += `\n${JSON.stringify(data, null, 2)}`;
    }
    return output;
  }

  error(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message, data));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message, data));
    }
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }
}

export const logger = new Logger();
