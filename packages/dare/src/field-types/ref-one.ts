import { Field, NullableField } from "../field";
import { Resource } from "../resource";

/**
 * A field representing a reference to another resource.
 *
 * Use this in many-to-one and one-to-one relationships.
 *
 * To get a proper string representation of the value you will have to
 * reimplement the `toString` method and the caller should also pass
 * the full record in the context.
 */
export class RefOneField<
    ResourceId extends string | number | symbol = string,
    FieldId extends string | number | symbol = string,
    Value = any | null,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The resource that is being referenced.
     */
    public resource: Resource<ResourceId, FieldId, Context>;

    /**
     * The referenced field in the other resource.
     */
    public field: Field<FieldId, Value, Context>;

    constructor(
        id: FieldId,
        nullable: boolean,
        otherRes: Resource<ResourceId, FieldId, Context>,
        otherField: Field<FieldId, Value, Context>,
    ) {
        super(id, nullable);
        this.resource = otherRes;
        this.field = otherField;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'ref-one';
    }

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `undefined` if the value is valid, an error otherwise.
     */
    override validate(value: Value, context: Context): (string | undefined) {
        return this.field.validate(value, context);
    }
}
