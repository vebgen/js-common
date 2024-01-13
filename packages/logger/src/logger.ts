import { LogHandler, Params } from "./handlers";
import { defaultNamedLevels, LogLevel } from "./levels";


/**
 * A logger for your messages.
 *
 * The logger knows certain named `levels` and can generate
 * log records for any numeric level.
 *
 * The logger also has a current `level`. Messages that have a
 * lower priority will get discarded.
 *
 * The log messages received by the logger are dispatched to
 * an internal list of `handlers`.
 */
export class Logger {
    protected static _logger: Logger | undefined = undefined;
    static get i() { return Logger._logger; }

    level: number;
    levels: Record<string | number, LogLevel>;
    handlers: LogHandler[];
    context: string[];

    constructor(
        level: number,
        handlers: LogHandler[],
        namedLevels?: LogLevel[],
        context?: string,
        makeDefault = false
    ) {
        this.level = level;
        this.handlers = handlers;
        this.context = context ? [context] : [];

        // Index levels by name and number.
        if (!namedLevels) {
            namedLevels = defaultNamedLevels();
        }
        this.levels = {};
        for (let i = 0; i < namedLevels.length; i++) {
            const level = namedLevels[i];
            this.levels[level.level] = level;
            this.levels[level.name] = level;
        }

        // Make this logger the default logger.
        if (makeDefault) {
            Logger._logger = this;
        }
    }

    pushContext(name: string) {
        this.context.push(name);
    }

    popContext() {
        return this.context.pop();
    }

    get topContext() {
        return (
            this.context.length
                ? this.context[this.context.length - 1]
                : undefined
        );
    }

    critical(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.CRITICAL, code, params, context);
    }

    security(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.SECURITY, code, params, context);
    }

    error(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.ERROR, code, params, context);
    }

    warn(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.WARNING, code, params, context);
    }

    info(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.INFO, code, params, context);
    }

    debug(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.DEBUG, code, params, context);
    }

    trace(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.TRACE, code, params, context);
    }

    log(
        level: number | LogLevel,
        code: string,
        params?: Params,
        context?: string | string[]
    ) {
        // Filter out this message early.
        if (level instanceof LogLevel) {
            level = level.level;
        }
        if (level < this.level) {
            return;
        }

        // Temporary push context.
        if (Array.isArray(context)) {
            this.context.splice(this.context.length, 0, ...context);
        } else if (context) {
            this.context.push(context);
        }

        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i].handle(this, level, code, params);
        }

        // Restore previous context.
        if (Array.isArray(context)) {
            this.context.splice(
                this.context.length - context.length, context.length
            );
        } else if (context) {
            this.context.splice(this.context.length - 1, 1);
        }
    }
}
