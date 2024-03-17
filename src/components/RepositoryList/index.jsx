import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import SortBy from "./SortBy";
import FilterText from "./FilterText";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  notTesting,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          individualView={false}
          item={item}
          notTesting={notTesting}
        />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={1}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latestAdditionFirst");
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText] = useDebounce(filterText, 500);
  const { repositories, fetchMore } = useRepositories(
    sortBy,
    debouncedFilterText
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <>
      <FilterText filterText={filterText} setFilterText={setFilterText} />
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
        notTesting={true}
      />
    </>
  );
};

export default RepositoryList;
