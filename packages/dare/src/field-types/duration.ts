import { nullStr } from "../constants";
import { IntegerField } from "./int";


type Value = number | null | undefined;


/**
 * A class representing a temporal duration.
 *
 * The duration is expected to be stored as a floating point,
 * with the integer part representing the number of seconds and the
 * decimal part representing the fraction of a second.
 *
 * The minimum value is 0 by default and, if specified, the cannot be smaller
 * than 0. The maximum value is not limited by default.
 *
 * The string representation of the value is a string in the format
 * `dd hh:mm:ss.fff`, where `dd` is the number of days with the `d` suffix,
 * `hh` is the number of hours, `mm` is the number of minutes, `ss` is the
 * number of seconds and `fff` is the number of milliseconds. If any of the
 * `dd`, `hh`, `mm` or `fff` components are `0`, they are omitted from the
 * string.
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class DurationField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends IntegerField<FieldId, Context>  {

    constructor(
        id: FieldId, nullable: boolean,
        min: number = 0,
        max?: number
    ) {
        super(id, nullable);
        this.min = min < 0 ? 0 : min;
        this.max = max;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    override get type(): string {
        return 'duration';
    }

    /**
     * Creates a string representation of the value.
     *
     * @param value The value to convert.
     * @param context A user-defined context provided to the method.
     * @returns a string representation of the value.
     */
    override toString(value: Value, context: Context): string {
        if (value === null || value === undefined) {
            return nullStr;
        }

        let seconds: number = Math.floor(value);
        const milliseconds: number = Math.floor((value - seconds) * 1000);

        const days = Math.floor(seconds / 86400);
        seconds -= days * 86400;

        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;

        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        const components = [];
        if (days) {
            components.push(days + 'd', ' ');
        }
        if (hours) {
            components.push(hours > 10 ? hours : '0' + hours, ':');
        }
        if (hours || minutes) {
            components.push(minutes > 10 ? minutes : '0' + minutes, ':');
        }
        components.push(seconds > 10 ? seconds : '0' + seconds);

        if (milliseconds) {
            components.push(
                '.',
                milliseconds > 100 ? milliseconds : (
                    milliseconds > 10
                    ? '0' + milliseconds
                    : '00' + milliseconds
            ));
        }

        return components.join('');
    }
}
