import { ScrollView, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { USER_INFO } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import SignOutTab from "./SignOutTab";

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
  const { data, loading, error } = useQuery(USER_INFO, {
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return console.error(error);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" destination={"/"} />
        {!loading && !data.me ? (
          <AppBarTab label="Sign In" destination={"/signIn"} />
        ) : (
          <SignOutTab />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
