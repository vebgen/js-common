import { nullStr } from "./constants";

/**
 * A class representing a field in a resource.
 *
 * @template FieldId The type of the field identifier.
 * @template Value The type of the field value.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export abstract class Field<
    FieldId extends string | number | symbol = string,
    Value = any,
    Context = any
> {
    /**
     * The identifier of the field.
     */
    private id_: FieldId;

    constructor(id: FieldId) {
        this.id_ = id;
    }

    /**
     * The identifier of the field.
     */
    get id(): FieldId {
        return this.id_;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    abstract get type(): string;

    /**
     * Does the values expected by this field form a list or are single values?
     */
    get isList(): boolean {
        return false;
    }

    /**
     * Should this field be displayed in the user interface?
     */
    get visible(): boolean {
        return true;
    };

    /**
     * Does this field accept null values?
     */
    abstract get nullable(): boolean;

    /**
     * Indicates if the column representing this field may be resized by the
     * user.
     */
    get userResizable(): boolean {
        return true;
    };

    /**
     * Indicates if the field can be used in sorting operations.
     */
    get userSortable(): boolean {
        return true;
    };

    /**
     * Indicates if the field can be used in filtering operations.
     */
    get userFilterable(): boolean {
        return true;
    };

    /**
     * Indicates if the field can be edited by the user.
     */
    get userEditable(): boolean {
        return true;
    };

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `undefined` if the value is valid, an error otherwise.
     */
    validate(
        value: Value, // eslint-disable-line @typescript-eslint/no-unused-vars
        context: Context, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): (string | undefined) {
        return undefined;
    }

    /**
     * Creates a string representation of the value.
     *
     * @param value The value to convert.
     * @param context A user-defined context provided to the method.
     * @returns a string representation of the value.
     */
    toString(
        value: Value,
        context: Context, // eslint-disable-line @typescript-eslint/no-unused-vars
    ): string {
        if (value === null || value === undefined) {
            return nullStr;
        }
        return '' + value;
    }
}


/**
 * A field that stores nullable property.
 *
 * @template FieldId The type of the field identifier.
 * @template Value The type of the field value.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export abstract class NullableField<
    FieldId extends string | number | symbol = string,
    Value = any | null,
    Context = any
> extends Field<FieldId, Value, Context> {
    /**
     * Wether this field accepts null values.
     */
    private nullable_: boolean;

    constructor(id: FieldId, nullable: boolean) {
        super(id);
        this.nullable_ = nullable;
    }

    /**
     * Does this field accept null values?
     */
    get nullable(): boolean {
        return this.nullable_;
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
    ): (string | undefined) {
        if (value === null || value === undefined) {
            if (this.nullable) {
                return undefined;
            } else {
                return this.type + '.null';
            }
        }
        return undefined;
    }
}
