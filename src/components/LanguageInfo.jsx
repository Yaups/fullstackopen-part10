import Text from "./Text";
import { View, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  languageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  flexItem: {
    backgroundColor: theme.colors.primary,
    border: 2,
    borderRadius: 8,
    padding: 5,
    flexGrow: 0,
  },
  languageText: {
    color: "white",
  },
});

const LanguageInfo = ({ item }) => {
  if (!item.language) return;

  return (
    <View style={styles.languageContainer}>
      <View style={styles.flexItem}>
        <Text style={styles.languageText}>{item.language}</Text>
      </View>
    </View>
  );
};

export default LanguageInfo;
