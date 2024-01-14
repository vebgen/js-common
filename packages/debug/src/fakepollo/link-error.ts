import { onError } from '@apollo/client/link/error';


export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                '[GraphQL error]: Message: %O, Location: %O, Path: %O',
                message, locations, path
            )
        );
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});
