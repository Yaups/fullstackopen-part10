import { useQuery } from "@apollo/client";
import { USER_INFO } from "../graphql/queries";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import Review from "./Review";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, error, refetch } = useQuery(USER_INFO, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) return;

  if (!data) return <Text>No user info found!</Text>;

  const reviewNodes =
    data.me && data.me.reviews
      ? data.me.reviews.edges.map((edge) => edge.node)
      : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Review review={item} showUserButtons={true} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviews;
