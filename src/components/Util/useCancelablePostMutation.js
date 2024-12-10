// src/hooks/useCancelablePostMutation.js
import { gql } from '@apollo/client';
import useCancelableQuery from './useCancelableQuery';

const ADD_MUTATION = gql`
  mutation AddData($input: Input!) {
    addData(input: $input) {
      id
      name
    }
  }
`;

const useCancelablePostMutation = () => {
  const { executeQuery, ...rest } = useCancelableQuery(async (client, variables, options) => {
    return await client.mutate({
      mutation: ADD_MUTATION,
      variables,
      ...options,
    });
  });

  return { executePostMutation: executeQuery, ...rest };
};

export default useCancelablePostMutation;
