import { NullableField } from "../field";

/**
 * A field that can take one of a set of values.
 *
 * @template FieldId The type of the field identifier.
 * @template Value The type of the field value.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export abstract class EnumField<
    FieldId extends string | number | symbol = string,
    Value = any,
    Context = any
> extends NullableField<FieldId, Value, Context> {

    /**
     * The set of allowed values for the field.
     */
    public values: Set<Value>;

    constructor(
        id: FieldId,
        nullable: boolean,
        values: Set<Value>,
    ) {
        super(id, nullable);
        this.values = values;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'enum';
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
        context: Context // eslint-disable-line @typescript-eslint/no-unused-vars
    ): (string | undefined) {
        if (value === null || value === undefined) {
            if (this.nullable) {
                return undefined;
            } else {
                return this.type + '.null';
            }
        }
        if (this.values.has(value)) {
            return undefined;
        }
        return this.type + '.invalid';
    }
}
