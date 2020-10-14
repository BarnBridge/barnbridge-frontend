import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: process.env.REACT_APP_THEGRAPH_BB_SUBGRAPH_URL,
  onError: () => {
    return {
      subscribe: () => null,
    } as any;
  },
});

const TheGraphProvider: React.FunctionComponent = props => (
  <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>
);

export default TheGraphProvider;
