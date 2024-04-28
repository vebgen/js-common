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
 * an internal list of `handlers`. Also available to the handlers
 * is the stack of `context` names which may be used to provide
 * additional context to the log messages.
 */
export class Logger {
    protected static _logger: Logger | undefined = undefined;
    static get i() { return Logger._logger; }

    protected level_: number;
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
        this.level_ = level;
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

        // Bind methods.
        this.critical = this.critical.bind(this);
        this.security = this.security.bind(this);
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
        this.info = this.info.bind(this);
        this.debug = this.debug.bind(this);
        this.trace = this.trace.bind(this);
        this.log = this.log.bind(this);

    }

    get level() {
        return this.level_;
    }

    set level(level: number) {
        this.level_ = level;
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

    /**
     * Log a message at the highest level of severity.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    critical(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.CRITICAL, code, params, context);
    }

    /**
     * Log an authorization or authentication message.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    security(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.SECURITY, code, params, context);
    }

    /**
     * Log an error message.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    error(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.ERROR, code, params, context);
    }

    /**
     * Log a warning message.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    warn(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.WARNING, code, params, context);
    }

    /**
     * Log an informative message.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    info(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.INFO, code, params, context);
    }

    /**
     * Log a debug message.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    debug(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.DEBUG, code, params, context);
    }

    /**
     * Log a message expected to generate a lot of output.
     *
     * @param code The message code.
     * @param params The message parameters.
     * @param extra Additional contextual information.
     */
    trace(code: string, params?: Params, context?: string | string[]) {
        this.log(this.levels.TRACE, code, params, context);
    }

    /**
     * Log a message at the given level.
     *
     * The other log methods are just wrappers around this one.
     *
     * @param level The level of the message.
     * @param code The message code.
     * @param params The message parameters.
     * @param context Additional contextual information.
     */
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
        if (level < this.level_) {
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
