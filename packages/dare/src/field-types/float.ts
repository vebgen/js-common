import { nullStr } from "../constants";
import { IntegerField } from "./int";


/**
 * A field representing a floating point number.
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class FloatField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends IntegerField<FieldId, Context> {
    /**
     * The number of decimal places to display.
     */
    public decimals: number | undefined;

    constructor(
        id: FieldId, nullable: boolean,
        min?: number, max?: number,
        decimals?: number
    ) {
        super(id, nullable, min, max);
        this.decimals = decimals;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    override get type(): string {
        return 'float';
    }

    /**
     * Creates a string representation of the value.
     *
     * @param value The value to convert.
     * @param context A user-defined context provided to the method.
     * @returns a string representation of the value.
     */
    override toString(
        value: number,
        context: Context // eslint-disable-line @typescript-eslint/no-unused-vars
    ): string {
        if (value === null || value === undefined) {
            return nullStr;
        }
        return value.toFixed(this.decimals);
    }
}
