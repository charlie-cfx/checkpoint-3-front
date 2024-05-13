import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
});
