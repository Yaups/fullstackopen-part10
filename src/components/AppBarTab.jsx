import { StyleSheet, Pressable, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexItem: {
    margin: 20,
    flexGrow: 1,
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ label }) => (
  <View style={styles.flexItem}>
    <Pressable onPress={() => alert("yoyoyo")}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  </View>
);

export default AppBarTab;
