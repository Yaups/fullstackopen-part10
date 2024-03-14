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

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) return <Text>Loading...</Text>;

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
    />
  );
};

export default IndividualRepository;
