import { Searchbar } from "react-native-paper";
import { View } from "react-native";

const FilterText = ({ filterText, setFilterText }) => {
  return (
    <View style={{ margin: 10 }}>
      <Searchbar
        placeholder="Filter text"
        onChangeText={setFilterText}
        value={filterText}
      />
    </View>
  );
};

export default FilterText;
