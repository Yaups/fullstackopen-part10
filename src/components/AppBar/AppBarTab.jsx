import { StyleSheet, Pressable, View } from "react-native";
import { Link } from "react-router-native";
import Text from "../Text";

const styles = StyleSheet.create({
  flexItem: {
    margin: 20,
  },
  text: {
    color: "white",
  },
});

const AppBarTab = ({ label, destination }) => (
  <View style={styles.flexItem}>
    <Pressable>
      <Link to={destination}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </Pressable>
  </View>
);

export default AppBarTab;
