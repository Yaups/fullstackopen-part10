import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

const SortBy = ({ sortBy, setSortBy }) => {
  return (
    <View style={{ margin: 6 }}>
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
