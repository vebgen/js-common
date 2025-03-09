import { Resource } from "./resource";


/**
 * A context object that can be extended by the user.
 */
export interface ContextBase {
    /** Retrieve a resource by its name. */
    name2res: (name: string) => Resource;
}
