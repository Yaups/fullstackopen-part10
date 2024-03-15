import { useQuery, useApolloClient } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortBy) => {
  const client = useApolloClient();

  const variables = {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  };

  switch (sortBy) {
    case "latestAdditionFirst": {
      break;
    }
    case "scoresDescending": {
      variables.orderBy = "RATING_AVERAGE";
      variables.orderDirection = "DESC";
      break;
    }
    case "scoresAscending": {
      variables.orderBy = "RATING_AVERAGE";
      variables.orderDirection = "ASC";
      break;
    }
    default: {
      break;
    }
  }

  console.log(variables);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
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
