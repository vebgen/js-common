import { errorLink } from "./link-error";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    from,
    ApolloClientOptions,
    NormalizedCacheObject
} from '@apollo/client';


/**
 * The options for the FakePollo constructor.
 */
export interface FakePolloOptions<
    TCacheShape extends NormalizedCacheObject
> {
    /**
     * The response object to return from the fetcher.
     *
     * This is the object that will be returned from the json() method
     * of the Response object.
     */
    responseObject?: any;

    /**
     * The reject object to return from the fetcher.
     *
     * If this value is set the fetcher will reject with this value.
     */
    rejectObject?: any;

    /**
     * A function that computes the Response object to return from the fetcher.
     *
     * This function is called with the uri and options passed to the fetcher
     * and can override the defaults.
     *
     */
    computeResponse?: (uri: RequestInfo | URL, options: any) => any;

    /**
     * A function that computes the data object to return from the fetcher.
     *
     * This function is called with the uri and options passed to the fetcher
     * and can override the defaults.
     *
     */
    computeResponseObject?: (uri: RequestInfo | URL, options: any) => any;

    /**
     * Overrides for the default ApolloClientOptions.
     */
    options?: Partial<ApolloClientOptions<TCacheShape>>;

    /**
     * Overrides for the default Response object.
     *
     * Default implementation returns a promise that resolves to a Response object
     * with the following properties:
     *
     * - headers: only Content-Type: application/json is provided
     * - ok: true
     * - status: 200
     * - redirected: false
     * - statusText: 'OK'
     * - type: 'basic'
     * - url: the stringified uri
     * - clone: returns undefined
     * - bodyUsed: true
     * - arrayBuffer: returns an empty ArrayBuffer
     * - blob: returns an empty Blob
     * - body: returns undefined
     * - formData: returns an empty FormData
     * - text: returns the stringified responseObject
     * - json: returns the responseObject
     *
     * You can use this member to augment the defaults provided
     * in the implementation.
     */
    response?: Partial<Response>;

    /**
     * A function that returns a promise that resolves to a Response object.
     *
     * This replaces the  internal implementation of the fetcher.
     *
     * Note that the default implementation of the fetcher will call
     * this function if it is defined and will not use any of the
     * responseObject, computeResponse, response.
     */
    fetcher?: (uri: RequestInfo | URL, options: any) => Promise<Response>;
};


/**
 * A fake ApolloClient that can be used for testing and mocking.
 */
export class FakePollo<
    TCacheShape extends NormalizedCacheObject
> extends ApolloClient<TCacheShape> {

    readonly responseObject?: any;
    readonly rejectObject?: any;
    readonly computeResponse?: (uri: RequestInfo | URL, options: any) => any;
    readonly computeResponseObject?: (
        uri: RequestInfo | URL, options: any
    ) => any;
    readonly response?: Partial<Response>;
    readonly fetcher?: (
        uri: RequestInfo | URL, options: RequestInit | undefined
    ) => Promise<Response>;

    constructor(
        {
            responseObject,
            rejectObject,
            computeResponse,
            computeResponseObject,
            options,
            response,
            fetcher
        }: FakePolloOptions<TCacheShape>
    ) {

        // Create the fake link.
        const httpLink = new HttpLink({
            uri: `${process.env['REACT_APP_API_DOMAIN']}/api/v1/graphql/`,
            print: (ast, originalPrint) => originalPrint(ast),
            fetch: (uri, options) => this.fetch(uri, options)
        });

        super({
            name: 'Mocked Apollo Client',
            version: '0.0.1',
            ssrMode: typeof window === 'undefined',
            ssrForceFetchDelay: 0,
            link: from([errorLink, httpLink]),
            assumeImmutableResults: true,
            cache: new InMemoryCache({}) as any,

            ...options,
        });

        // Save options.
        this.responseObject = responseObject;
        this.rejectObject = rejectObject;
        this.computeResponse = computeResponse;
        this.computeResponseObject = computeResponseObject;
        this.response = response;
        this.fetcher = fetcher;

        // Bind methods.
        this.fetch = this.fetch.bind(this);
    }

    /**
     * The fetcher implementation.
     *
     * If a fetcher is provided in the options it is used.
     * Otherwise the default implementation is used.
     */
    fetch(
        uri: RequestInfo | URL,
        options: RequestInit | undefined
    ): Promise<Response> {
        // console.log(
        //     "[MockApollo] fetch called uri = %O, options = %O",
        //     uri, options
        // );
        if (this.fetcher !== undefined) {
            return this.fetcher(uri, options);
        }

        return new Promise((resolve, reject) => {
            if (this.rejectObject !== undefined) {
                reject(this.rejectObject);
                return;
            }

            resolve({
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                json: () => {
                    // console.log("[MockApollo] json called")
                    return Promise.resolve({
                        data: this.computeResponseObject
                            ? this.computeResponseObject(uri, options)
                            : this.responseObject
                    });
                },
                ok: true,
                status: 200,
                redirected: false,
                statusText: 'OK',
                type: 'basic',
                url: uri.toString(),
                clone: function () {
                    return undefined as any;
                } as any,
                bodyUsed: true,
                arrayBuffer: () => {
                    // console.log("[MockApollo] arrayBuffer called")
                    return Promise.resolve(new ArrayBuffer(0));
                },
                blob: () => {
                    // console.log("[MockApollo] blob called")
                    return Promise.resolve(new Blob());
                },
                formData: () => {
                    // console.log("[MockApollo] formData called")
                    return Promise.resolve(new FormData());
                },
                text: () => {
                    // console.log("[MockApollo] text called")
                    const resultObject = {
                        data: (
                            this.computeResponseObject
                                ? this.computeResponseObject(uri, options)
                                : this.responseObject
                        ),
                    };
                    const textResult = JSON.stringify(resultObject);
                    // console.log("[MockApollo] text result: %O", textResult);
                    return Promise.resolve(textResult);
                },
                body: undefined as any,
                ...this.response,
                ...(
                    this.computeResponse
                        ? this.computeResponse(uri, options)
                        : {}
                ),
            } as any);
        });
    }
}
