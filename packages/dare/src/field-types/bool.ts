import { nullStr } from "../constants";
import { NullableField } from "../field";

type Value = boolean | undefined | null;


/**
 * A field representing a boolean value.
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export abstract class BooleanField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'bool';
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
        return value ? '✔️' : '❌';
    }
}
