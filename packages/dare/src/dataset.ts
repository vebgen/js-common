import { Resource } from "./resource";

/**
 * A dataset consists of a collection of resources.
 *
 * @template DatasetId The type of the dataset identifier.
 * @template ResourceId The type of the resource identifier.
 * @template FieldId The type of the field identifier.
 */
export interface Dataset<
    DatasetId extends string | number | symbol = string,
    ResourceId extends string | number | symbol = string,
    FieldId extends string | number | symbol = string
> {
    /**
     * The identifier of the dataset.
     */
    id: DatasetId;

    /**
     * The resources in the dataset.
     */
    resources: Resource<ResourceId, FieldId>[];
}
