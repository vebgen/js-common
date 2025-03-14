import { nullStr } from '../constants';
import { NullableField } from '../field';

type Value = string | null | undefined;

/**
 * A class representing a date and time.
 *
 * The class expects values in the ISO date format (this includes the minimum
 * and maximum values).
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class DateTimeField<
    FieldId extends string | number | symbol = string,
    Context = any,
> extends NullableField<FieldId, Value, Context> {
    /**
     * The minimum acceptable value (inclusive).
     */
    public min: string | undefined;

    /**
     * The maximum acceptable value (exclusive).
     */
    public max: string | undefined;

    constructor(id: FieldId, nullable: boolean, min?: string, max?: string) {
        super(id, nullable);
        this.min = min;
        this.max = max;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'dt';
    }

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `undefined` if the value is valid, an error otherwise.
     */
    override validate(
        value: Value,
        context: Context, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): string | undefined {
        if (value === null || value === undefined) {
            if (this.nullable) {
                return undefined;
            } else {
                return this.type + '.null';
            }
        }
        if (typeof value !== 'string') {
            return this.type + '.string';
        }
        if (
            !value.match(
                /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
            )
        ) {
            return this.type + '.format';
        }
        return undefined;
    }

    /**
     * Creates a string representation of the value.
     *
     * @param value The value to convert.
     * @param context A user-defined context provided to the method.
     * @returns a string representation of the value.
     */
    override toString(
        value: Value,
        context: Context, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): string {
        if (value === null || value === undefined) {
            return nullStr;
        }
        return value;
    }
}
