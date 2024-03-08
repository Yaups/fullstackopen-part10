import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label={"Repositories"} />
    </View>
  );
};

export default AppBar;