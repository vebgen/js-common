import { gql } from '@apollo/client';
import { FakePollo } from './client';


describe('FakePollo', () => {
    it('should be able to create a client without any options', () => {
        const client = new FakePollo({});
        expect(client).toBeTruthy();
    });
    it('should be able to create a client with a response object', () => {
        const client = new FakePollo({
            responseObject: { hello: 'world' }
        });
        expect(client).toBeTruthy();
        client.query({
            query: gql(`{ hello }`)
        }).then((result) => {
            expect(result).toBeTruthy();
            expect(result.data).toEqual({ hello: 'world' });
        });
    });
    it('should be able to create a client with a reject object', () => {
        const client = new FakePollo({
            rejectObject: { hello: 'world' }
        });
        expect(client).toBeTruthy();
        client.query({
            query: gql(`{ hello }`)
        }).catch((result) => {
            expect(result).toBeTruthy();
            expect(result.name).toEqual('ApolloError');
            expect(result.message).toBe("Error message not found.");
            expect(result.graphQLErrors.length).toBe(0);
            expect(result.networkError).toEqual({ hello: 'world' });
        });
    });

    it('should be able to override some of the response fields', () => {
        const client = new FakePollo({
            response: {
                status: 500,
                statusText: 'Internal Server Error',
            }
        });
        expect(client).toBeTruthy();
        client.query({
            query: gql(`{ hello }`)
        }).catch((result) => {
            expect(result).toBeTruthy();
            expect(result.name).toEqual('ApolloError');
            expect(result.message).toBe("Response not successful: Received status code 500");
            expect(result.graphQLErrors.length).toBe(0);
            expect(result.networkError.name).toBe("ServerError");
        });
    });


    it('should be able to compute the response on the fly', () => {
        const client = new FakePollo({
            computeResponse: (uri, options) => {
                return {
                    status: 500,
                    statusText: 'Internal Server Error',
                };
            }
        });
        expect(client).toBeTruthy();
        client.query({
            query: gql(`{ hello }`)
        }).catch((result) => {
            expect(result).toBeTruthy();
            expect(result.name).toEqual('ApolloError');
            expect(result.message).toBe("Response not successful: Received status code 500");
            expect(result.graphQLErrors.length).toBe(0);
            expect(result.networkError.name).toBe("ServerError");
        });
    });

    it('should be able to create a client with a fetcher', () => {
        const client = new FakePollo({
            fetcher: (uri, options) => {
                return new Promise((resolve, reject) => {
                    resolve({
                        headers: new Headers({
                            'Content-Type': 'application/json',
                        }),
                        json: () => {
                            return Promise.resolve({
                                data: { hello: 'world' }
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
                            return Promise.resolve(new ArrayBuffer(0));
                        },
                        blob: () => {
                            return Promise.resolve(new Blob());
                        },
                        formData: () => {
                            return Promise.resolve(new FormData());
                        },
                        text: () => {
                            return Promise.resolve(JSON.stringify({
                                data: { hello: 'world' },
                            }));
                        },
                        body: undefined as any,
                    } as any);
                });
            }
        });
        expect(client).toBeTruthy();
        client.query({
            query: gql(`{ hello }`)
        }).then((result) => {
            expect(result).toBeTruthy();
            expect(result.data).toEqual({ hello: 'world' });
        });
    });
});
