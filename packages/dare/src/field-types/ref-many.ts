import { Field, NullableField } from '../field';
import { Resource } from '../resource';
import { ContextBase } from '../defs';


/**
 * A field representing a reference to another resource.
 *
 * Use this in many-to-many and one-to-many relationships.
 *
 * To get a proper string representation of the value you will have to
 * reimplement the `toString` method and the caller should also pass
 * the full record in the context.
 */
export class RefManyField<
    ResourceId extends string | number | symbol = string,
    FieldId extends string | number | symbol = string,
    Value = any[] | null,
    Context extends ContextBase = any,
> extends NullableField<FieldId, Value, Context> {
    /**
     * The resource that is being referenced.
     */
    public resource: string | Resource<ResourceId, FieldId, Context>;

    /**
     * The referenced field in the other resource.
     */
    public field: string | Field<FieldId, Value, Context>;

    constructor(
        id: FieldId,
        nullable: boolean,
        otherRes: string | Resource<ResourceId, FieldId, Context>,
        otherField: string | Field<FieldId, Value, Context>,
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
        return 'ref-many';
    }

    /**
     * Does the values expected by this field form a list or are single values?
     */
    override get isList(): boolean {
        return true;
    }

    /**
     * Makes sure that the resource and field are resolved.
     */
    resolve(context: Context) {
        if (typeof this.resource === 'string') {
            this.resource = context.name2res(this.resource) as any;
        }

        if (typeof this.field === 'string') {
            this.field = (this.resource as Resource).fields[this.field] as any;
        }
    }

    /**
     * Checks if a value is valid for the field.
     *
     * @param value The value to validate.
     * @param context A user-defined context provided to the method.
     * @returns `undefined` if the value is valid, an error otherwise.
     */
    override validate(value: Value, context: Context): string | undefined {
        if (value === null || value === undefined) {
            if (this.nullable) {
                return undefined;
            } else {
                return this.type + '.null';
            }
        }
        if (!Array.isArray(value)) {
            return this.type + '.array';
        }
        if (!(this.field instanceof Field)) {
            this.resolve(context);
        }

        for (const item of value) {
            const error = (this.field as Field).validate(item, context);

            if (error) {
                return error;
            }
        }
        return undefined;
    }
}
