import { StyleSheet, Pressable, View } from "react-native";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

const styles = StyleSheet.create({
  flexItem: {
    margin: 20,
  },
  text: {
    color: "white",
  },
});

const SignOutTab = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={handleSignOut}>
        <Text style={styles.text}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default SignOutTab;
