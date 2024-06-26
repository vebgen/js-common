# logger

Un-opinionated logging utilities.

Take a look at the `@vebgen/top-contexts` package for a React context that uses
these utilities.

## Usage

First create a logger and provide it with a minimum log level (messages below
this level will not be logged) and a list of handlers:

```js
const loggerLevel = 1;
const logHandlers = [
    new ConsoleHandler(),
]
const logger = new Logger(
    loggerLevel, logHandlers
);
```

There are two handlers that you can use out of the box:

- `ConsoleHandler`: logs to the WebConsole and
- `ApiHandler`: logs to a remote point.

You can implement your own handler based on `LogHandler` class and you
can have as many handlers in a logger as you like.

Now you can send messages to the logger:

```js
logger.error("Something went wrong");
```

### Logging

The main function that implements the logging mechanism is `Logger.log()`.
You provide it with:

- a log level indicating the severity of this message,
- a message body,
- some parameters related to this message (optional) and
- a context (also optional, see below).

To make things easier the class also implements following methods
that call the `Logger.log()` with an appropriate log level:
`critical`, `security`, `error`, `warn`, `info`, `debug` and `trace`.

### Handlers

The only required method of the handlers is the `handle()` method.
It receives the message that passed the `level` filtering
and has access to the logger that issued the message.

The default console handler attempts to give an unique look to the messages
generated by the logger.

The api logger attempts to use the beacon API used for web vitals
and falls back to using fetch. It expects an url at construction time.

### Context

The logger holds a stack of strings to which the user can push and pop
to indicate context for the messages to follow.

On top of that each log call can indicate its own context either as
a single string or as an array of strings.

### Levels

The default implementation takes hints from the python logging module.
The log level can be indicated by a numeric value of by a named level.

You can choose to use different numeric constants for the different levels
by providing the logger constructor with a list of your named levels.
For the default implementation of specific log functions (error, warn, debug, etc)
to work your levels have to be named the same as default ones
(`CRITICAL`, `SECURITY`, `ERROR`, `WARNING`, `INFO`, `DEBUG`, `TRACE`).
You can, of course, override the implementation of these functions, in which case
you can use whatever you like as level names.

Note that handlers receive only the numeric value of the level so they are not
affected in any way by the implementation of the levels.

## Running unit tests

Run `nx test logger` to execute the unit tests via [Jest](https://jestjs.io).
