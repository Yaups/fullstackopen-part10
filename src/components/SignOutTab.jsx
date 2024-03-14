import { StyleSheet, Pressable, View } from "react-native";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";
import { useNavigate } from "react-router-native";

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
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
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
