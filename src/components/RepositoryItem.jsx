import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import NumbersInfo from "./NumbersInfo";
import LanguageInfo from "./LanguageInfo";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

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
  button: {
    margin: 10,
    border: 2,
    borderRadius: 4,
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

const RepositoryItem = ({ item, individualView }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (!individualView) navigate(`/${item.id}`);
  };

  return (
    <View testID="repositoryItem" style={styles.mainContainer}>
      <Pressable onPress={handlePress}>
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

        {individualView && (
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text fontWeight={"bold"} style={styles.buttonText}>
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
