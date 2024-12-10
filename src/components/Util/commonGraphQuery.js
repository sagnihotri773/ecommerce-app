import { gql } from "@apollo/client";
import { client } from '@/lib/graphql/apolloClient';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Function to dynamically create a GraphQL query
export const dynamicFetchData = async (query, values) => {
  try {
    const { data } = await client.query({
      query: gql`${query}`,
      fetchPolicy: 'no-cache',
      variables: values
    });
    
    return data;
  } catch (error) {

    console.log("Error fetching data: ", error);
    throw error;
  }
};

// Function to dynamically create a GraphQL mutation
export const dynamicMutateData = async (mutation, variables) => {
  // const mutation = `
  //   mutation ($input: ${inputType}!) {
  //     ${operation}(input: $input) {
  //       ${Object.keys(variables.input).join('\n')}
  //     }
  //   }
  // `;
  try {
    const { data, loading } = await client.mutate({
      mutation: gql`${mutation}`,
      variables: variables,
      fetchPolicy: 'no-cache',
    });
    return data;
  } catch (error) {
    toast.error(error?.message)
    return error
  }
};

// Example usage of dynamicFetchData
export const getDynamicData = async (query, variables) => {
  return await dynamicFetchData(query, variables);
};

export const createDynamicData = async (query, variables = '') => {
  return await dynamicMutateData(query, variables);
};