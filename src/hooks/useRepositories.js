import { useQuery, useApolloClient } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const client = useApolloClient();

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return console.error(error);
  }

  return {
    repositories: loading ? null : data.repositories,
    loading,
    refetch: () =>
      client.refetchQueries({
        include: [GET_REPOSITORIES],
      }),
  };
};

export default useRepositories;
