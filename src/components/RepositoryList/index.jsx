import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import SortBy from "./SortBy";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem individualView={false} item={item} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<SortBy sortBy={sortBy} setSortBy={setSortBy} />}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latestAdditionFirst");
  const { repositories } = useRepositories(sortBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

export default RepositoryList;
