import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  flexItem: {
    margin: 7,
    flexGrow: 1,
  },
  text: {
    textAlign: "center",
  },
});

const NumbersInfo = ({ item }) => {
  const stargazersCountToShow =
    item.stargazersCount >= 1000
      ? `${(item.stargazersCount / 1000).toFixed(1)}k`
      : item.stargazersCount;

  const forksCountToShow =
    item.forksCount >= 1000
      ? `${(item.forksCount / 1000).toFixed(1)}k`
      : item.forksCount;

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItem}>
        <Text fontWeight="bold" style={styles.text}>
          {stargazersCountToShow}
        </Text>
        <Text color="textSecondary" style={styles.text}>
          Stars
        </Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight="bold" style={styles.text}>
          {forksCountToShow}
        </Text>
        <Text color="textSecondary" style={styles.text}>
          Forks
        </Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight="bold" style={styles.text}>
          {item.ratingAverage}
        </Text>
        <Text color="textSecondary" style={styles.text}>
          Rating
        </Text>
      </View>
      <View style={styles.flexItem}>
        <Text fontWeight="bold" style={styles.text}>
          {item.reviewCount}
        </Text>
        <Text color="textSecondary" style={styles.text}>
          Reviews
        </Text>
      </View>
    </View>
  );
};

export default NumbersInfo;
