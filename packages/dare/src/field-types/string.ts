import { NullableField } from "../field";


type Value = string | undefined | null;


/**
 * A field representing a string (either single-line or multi-line).
 */
export class StringField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The number of decimal places to display.
     */
    public multiline: boolean;

    constructor(
        id: FieldId, nullable: boolean,
        multiline: boolean = true
    ) {
        super(id, nullable);
        this.multiline = !!multiline;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'string';
    }
}
