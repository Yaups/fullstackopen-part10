import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import NumbersInfo from "./NumbersInfo";
import LanguageInfo from "./LanguageInfo";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  containerHorizontal: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  containerVertical: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  flexItem: {
    margin: 4,
  },
  thumbnailImageContainer: {
    margin: 10,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.mainContainer}>
      <View style={styles.containerHorizontal}>
        <View style={styles.thumbnailImageContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>

        <View style={styles.containerVertical}>
          <View style={styles.flexItem}>
            <Text fontWeight="bold">{item.fullName}</Text>
          </View>
          <View style={styles.flexItem}>
            <Text color="textSecondary">{item.description}</Text>
          </View>
          <View style={styles.flexItem}>
            <LanguageInfo item={item} />
          </View>
        </View>
      </View>

      <View style={styles.flexItem}>
        <NumbersInfo item={item} />
      </View>
    </View>
  );
};

export default RepositoryItem;
