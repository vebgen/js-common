import { Field } from "./field";

/**
 * The resource consists of a list of fields.
 *
 * @template ResourceId The type of the resource identifier.
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export interface Resource<
    ResourceId extends string | number | symbol = string,
    FieldId extends string | number | symbol = string,
    Context = any
> {
    /**
     * The identifier of the resource.
     */
    id: ResourceId;

    /**
     * The fields in the resource.
     */
    fields: Record<FieldId, Field<FieldId, any, Context>>;
}
