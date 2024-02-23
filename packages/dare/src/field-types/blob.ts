import { Field } from "../field";

/**
 * A field representing opaque data.
 *
 * This field type is used to represent opaque data that is not intended to be
 * displayed in the user interface.
 *
 * @template FieldId The type of the field identifier.
 * @template Value The type of the field value.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class BlobField<
    FieldId extends string | number | symbol = string,
    Value = any,
    Context = any
> extends Field<FieldId, Value, Context> {
    /**
     * The identifier of the type.
     */
    get type() {
        return 'blob';
    }

    /**
     * Should this field be displayed in the user interface?
     */
    override get visible(): boolean {
        return false;
    };

    /**
     * Does this field accept null values?
     */
    get nullable(): boolean {
        return true;
    }

    /**
     * Indicates if the field can be used in sorting operations.
     */
    override get userSortable(): boolean {
        return false;
    };

    /**
     * Indicates if the field can be used in filtering operations.
     */
    override get userFilterable(): boolean {
        return false;
    };

    /**
     * Indicates if the field can be edited by the user.
     */
    override get userEditable(): boolean {
        return false;
    };

    /**
     * Creates a string representation of the value.
     *
     * @param value The value to convert.
     * @param context A user-defined context provided to the method.
     * @returns a string representation of the value.
     */
    override toString(value: Value, context: Context): string {
        if (value) {
            return '♤♧♡♢';
        } else {
            return '';
        }
    }
}
