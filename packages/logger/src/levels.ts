/**
 * These are some constants.
 */
export const CRITICAL = 50;
export const FATAL = CRITICAL;
export const SECURITY = 41;
export const ERROR = 40;
export const WARNING = 30;
export const WARN = WARNING;
export const INFO = 20;
export const DEBUG = 10;
export const TRACE = 5;
export const NOTSET = 0;


/**
 * A log level that also has a name.
 * 
 * The level is expressed as an integer. Usually these
 * values are between 0 and 50.
 */
export class LogLevel {
    level: number;
    name: string;

    constructor(level: number, name: string) {
        this.level = level;
        this.name = name;
    }
};


/**
 * Creates a default list of log levels.
 */
export function defaultNamedLevels() {
    return [
        new LogLevel(CRITICAL, "CRITICAL"),
        new LogLevel(SECURITY, "SECURITY"),
        new LogLevel(ERROR, "ERROR"),
        new LogLevel(WARNING, "WARNING"),
        new LogLevel(INFO, "INFO"),
        new LogLevel(DEBUG, "DEBUG"),
        new LogLevel(TRACE, "TRACE"),
        new LogLevel(NOTSET, "NOTSET"),
    ];
};
