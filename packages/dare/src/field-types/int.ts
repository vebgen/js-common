import { NullableField } from "../field";

type Value = number | null | undefined;


/**
 * A field representing an integer number.
 */
export class IntegerField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The minimum acceptable value (inclusive).
     */
    public min: number | undefined;

    /**
     * The maximum acceptable value (exclusive).
     */
    public max: number | undefined;

    constructor(
        id: FieldId, nullable: boolean,
        min?: number, max?: number,
        decimals?: number
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
        return 'integer';
    }

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `true` if the value is valid, `false` otherwise.
     */
    override validate(value: Value, context: Context): (string | undefined) {
        if (value === null || value === undefined) {
            if (this.nullable) {
                return undefined;
            } else {
                return this.type + '.null';
            }
        }

        if (this.min !== undefined && value < this.min) {
            return this.type + '.min';
        }
        if (this.max !== undefined && value >= this.max) {
            return this.type + '.max';
        }
        return undefined;
    }
}
