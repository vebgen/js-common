import { nullStr } from "../constants";
import { NullableField } from "../field";

type Value = string | null | undefined;


/**
 * A class representing a date field without time.
 *
 * The class expects values in the format `YYYY-MM-DD` (this includes the
 * minimum and maximum values).
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class DateField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The minimum acceptable value (inclusive) in the format `YYYY-MM-DD`.
     */
    public min: string | undefined;

    /**
     * The maximum acceptable value (exclusive) in the format `YYYY-MM-DD`.
     */
    public max: string | undefined;

    constructor(
        id: FieldId, nullable: boolean,
        min?: string,
        max?: string
    ) {
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
        return 'date';
    }

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `undefined` if the value is valid, an error otherwise.
     */
    override validate(value: Value, context: Context): (string | undefined) {
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
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
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
    override toString(value: Value, context: Context): string {
        if (value === null || value === undefined) {
            return nullStr;
        }
        return value;
    }
}
