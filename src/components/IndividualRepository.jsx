import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import Review from "./Review";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const IndividualRepository = () => {
  const { repositoryId } = useParams();
  const variables = { id: repositoryId, first: 5 };

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const onEndReach = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) return;

  if (!data) return <Text>No repository info found!</Text>;

  const reviewNodes =
    data.repository && data.repository.reviews
      ? data.repository.reviews.edges.map((edge) => edge.node)
      : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem individualView={true} item={data.repository} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={1}
    />
  );
};

export default IndividualRepository;
