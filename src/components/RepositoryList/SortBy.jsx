import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sortBy: {
    margin: 10,
    marginTop: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
});

const SortBy = ({ sortBy, setSortBy }) => {
  return (
    <View style={styles.sortBy}>
      <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) => {
          setSortBy(itemValue);
        }}
      >
        <Picker.Item label="Latest repositories" value="latestAdditionFirst" />
        <Picker.Item
          label="Highest rated repositories first"
          value="scoresDescending"
        />
        <Picker.Item
          label="Lowest rated repositories first"
          value="scoresAscending"
        />
      </Picker>
    </View>
  );
};

export default SortBy;
