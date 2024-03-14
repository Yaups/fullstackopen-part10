import { StyleSheet, View } from "react-native";
import format from "date-fns/format";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  containerVertical: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  flexItem: {
    padding: 5,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Review = ({ review }) => {
  if (!review) return;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexItem}>
        <View style={styles.rating}>
          <Text fontWeight="bold" color="primary">
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(review.createdAt, "dd/MM/yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default Review;
