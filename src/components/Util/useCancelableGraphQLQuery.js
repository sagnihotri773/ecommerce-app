// src/hooks/useCancelableGraphQLQuery.js
import { useState, useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client';

const useCancelableGraphQLQuery = (query, variables) => {
  const client = useApolloClient();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const operationRef = useRef(null);

  useEffect(() => {
    return () => {
      if (operationRef.current) {
        operationRef.current.cancel();
      }
    };
  }, []);

  const fetchData = async () => {
    if (operationRef.current) {
      operationRef.current.cancel();
    }

    setLoading(true);
    try {
      const { data } = await client.query({
        query,
        variables,
        fetchPolicy: 'network-only',
        context: {
          fetchOptions: {
            signal: operationRef.current?.signal,
          },
        },
      });
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useCancelableGraphQLQuery;
