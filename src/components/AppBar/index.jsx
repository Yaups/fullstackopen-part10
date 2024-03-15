import { ScrollView, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import { USER_INFO } from "../../graphql/queries";
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

  const isSignedIn = !loading && data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" destination={"/"} />

        {isSignedIn && (
          <AppBarTab label="Create a review" destination={"/reviewForm"} />
        )}

        {isSignedIn ? (
          <SignOutTab />
        ) : (
          <AppBarTab label="Sign In" destination={"/signIn"} />
        )}

        {!isSignedIn && <AppBarTab label="Sign up" destination={"/signUp"} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
