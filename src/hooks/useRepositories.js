import { useQuery, useApolloClient } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortBy, filterText) => {
  const client = useApolloClient();

  const variables = {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    searchKeyword: filterText,
    first: 5,
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

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) {
    return console.error(error);
  }

  return {
    repositories: loading ? null : data.repositories,
    loading,
    fetchMore: handleFetchMore,
    refetch: () =>
      client.refetchQueries({
        include: [GET_REPOSITORIES],
      }),
  };
};

export default useRepositories;
