import { Text, View } from "react-native";

const RepositoryItem = ({ item }) => (
  <View>
    <Text>Full name: {item.fullName}</Text>
    <Text>Description: {item.description}</Text>
    <Text>Language: {item.language}</Text>
    <Text>Stars: {item.stargazersCount}</Text>
    <Text>Forks: {item.forksCount}</Text>
    <Text>Average rating: {item.ratingAverage}</Text>
    <Text>Review count: {item.reviewCount}</Text>
  </View>
);

export default RepositoryItem;
