import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import {errorLink, authLink, httpLink} from "./apollo-link";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        myField: {
          // Limit cache entries to the last 10 items
          keyArgs: false, // Ignores arguments for cache key
          merge(existing = [], incoming, { args }) {
            const limit = 10;
            const merged = [...existing, ...incoming];
            return merged.slice(-limit); // Keep only the last 10 items
          },
        },
      },
    },
  },
});
export const client = new ApolloClient({
  cache,
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, authLink, httpLink])
});