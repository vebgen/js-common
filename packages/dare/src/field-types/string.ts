import { NullableField } from '../field';

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
    Context = any,
> extends NullableField<FieldId, Value, Context> {
    /**
     * Wether this is a multi-line string or not.
     */
    public multiline: boolean;

    /**
     * The maximum length of the string.
     */
    public maxLength?: number;

    /**
     * The minimum length of the string.
     */
    public minLength?: number;

    constructor(
        id: FieldId,
        nullable: boolean,
        multiline: boolean = true,
        maxLength?: number,
        minLength?: number,
    ) {
        super(id, nullable);
        this.multiline = !!multiline;
        this.maxLength = maxLength;
        this.minLength = minLength;
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
    Context = any,
> extends NullableField<FieldId, Value, Context> {
    /**
     * The format hint for the string (`json`, `html`, `xml`, etc.)
     */
    public format: string;

    /**
     * The maximum length of the string.
     */
    public maxLength?: number;

    /**
     * The minimum length of the string.
     */
    public minLength?: number;

    constructor(
        id: FieldId,
        nullable: boolean,
        format: string,
        maxLength?: number,
        minLength?: number,
    ) {
        super(id, nullable);
        this.format = format;
        this.maxLength = maxLength;
        this.minLength = minLength;
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
