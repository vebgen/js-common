import { NullableField } from "../field";


type Value = string | undefined | null;


/**
 * A field representing a string (either single-line or multi-line).
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class StringField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * Wether this is a multi-line string or not.
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


/**
 * A field representing a multiline string with a format hint.
 *
 * @template FieldId The type of the field identifier.
 * @template Context A user-defined context provided to various methods of the
 *  field.
 */
export class FormattedField<
    FieldId extends string | number | symbol = string,
    Context = any
> extends NullableField<FieldId, Value, Context> {
    /**
     * The format hint for the string (`json`, `html`, `xml`, etc.)
     */
    public format: string;

    constructor(
        id: FieldId, nullable: boolean,
        format: string
    ) {
        super(id, nullable);
        this.format = format;
    }

    /**
     * The identifier of the type.
     *
     * While the `id` property is used to identify the field in the resource,
     * the `type` property is used to identify the kind of field (is a property
     * of the class).
     */
    get type(): string {
        return 'formatted';
    }
}
