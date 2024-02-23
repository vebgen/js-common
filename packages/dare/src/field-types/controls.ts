import { Field } from "../field";

/**
 * A field representing controls for a row.
 *
 * When presenting a set of records as a table, it is common to have a column
 * with controls to perform operations on the row.
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class ControlsField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends Field<FieldId, void, Context> {
    /**
     * The identifier of the type.
     */
    get type() {
        return 'controls';
    }

    /**
     * Does this field accept null values?
     */
    get nullable(): boolean {
        return false;
    }

    /**
     * Indicates if the column representing this field may be resized by the
     * user.
     */
    override get userResizable(): boolean {
        return false;
    };

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
}
