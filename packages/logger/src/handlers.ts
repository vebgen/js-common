import { formatString } from "@vebgen/js-common";

import {
    CRITICAL, DEBUG, ERROR, INFO, SECURITY, TRACE, WARNING
} from "./levels";
import { Logger } from "./logger";


/**
 * The type for extra parameters.
 */
export type Params = Record<string, any>;


/**
 * Base class for log handlers.
 */
export class LogHandler {
    handle(logger: Logger, level: number, code: string, params?: Params) {
        throw new Error(
            "handle method of the LogHandler class must be implemented " +
            `in a subclass (level: ${level}, code: ${code}, ` +
            `params: ${JSON.stringify(params)})`
        );
    }
};


/**
 * A log handler that prints messages to the console.
 */
export class ConsoleHandler extends LogHandler {
    handle(logger: Logger, level: number, code: string, params?: Params) {
        let func;
        let style: string;
        if (level >= CRITICAL) {
            func = console.error;
            style = (
                "display: inline-block; " +
                "color: red; " +
                "font-style: italic; " +
                "background-color: black; " +
                "padding: 20px; " +
                "border: 1px solid red"
            );
        } else if (level >= SECURITY) {
            func = console.error;
            style = (
                "display: inline-block; " +
                "color: red; " +
                "font-style: italic; " +
                "background-color: yellow; " +
                "padding: 10px; " +
                "border: 1px solid red"
            );
        } else if (level >= ERROR) {
            func = console.error;
            style = (
                "display: inline-block; " +
                "color: red; " +
                "font-style: italic; " +
                "background-color: lightgrey; " +
                "padding: 5px; " +
                "border: 1px solid red"
            );
        } else if (level >= WARNING) {
            func = console.warn;
            style = "color: magenta; background-color: lightgrey; padding: 2px";
        } else if (level >= INFO) {
            func = console.info;
            style = "color: blue; background-color: lightgrey; padding: 2px";
        } else if (level >= DEBUG) {
            func = console.debug;
            style = "color: green; background-color: lightgrey";
        } else if (level >= TRACE) {
            func = console.log;
            style = "color: grey; background-color: white; font-style: italic";
        } else {
            func = console.log;
            style = (
                "color: white; " +
                "background-color: red; " +
                "border: 1px solid black"
            );
        }

        let ctx = '';
        if (logger.context.length) {
            ctx = `[${logger.context.join('.')}] `;
        }

        if (params) {
            func(`%c%s${formatString(code, params)} %O`, style, ctx, params);
        } else {
            func(`%c%s${code}`, style, ctx);
        }
    }
};


/**
 * A log handler that sends messages to a remote location.
 */
export class ApiHandler extends LogHandler {
    url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    handle(logger: Logger, level: number, code: string, params?: Params) {
        const body = JSON.stringify({
            level,
            code,
            params,
            context: logger.context,
        });

        if (navigator.sendBeacon) {
            const headers = {
                type: 'application/json',
            };
            const blob = new Blob([body], headers);
            navigator.sendBeacon(this.url, blob);
        } else {
            fetch(this.url, {
                body,
                method: 'POST',
                keepalive: true,
                headers: new Headers({
                    'content-type': 'application/json'
                }),
            });
        }
    }
}
