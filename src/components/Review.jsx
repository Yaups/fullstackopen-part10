import { StyleSheet, View, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import format from "date-fns/format";
import Text from "./Text";
import theme from "../theme";

import { DELETE_REVIEW } from "../graphql/mutations";
import { USER_INFO } from "../graphql/queries";
import { useMutation } from "@apollo/client";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    paddingBottom: 5,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  userButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
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
    flexGrow: 0,
    flexShrink: 1,
  },
  buttonContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  button: {
    margin: 10,
    border: 2,
    borderRadius: 4,
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
  redButton: {
    margin: 10,
    border: 2,
    borderRadius: 4,
    padding: 15,
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

const UserButtons = ({ review }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [USER_INFO],
  });

  const redirectToRepository = () => {
    if (review.repositoryId) navigate(`/${review.repositoryId}`);
    else alert("Repository not found");
  };

  const confirmDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeletion,
        },
      ]
    );
  };

  const handleDeletion = async () => {
    await deleteReview({ variables: { reviewId: review.id } });
  };

  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={redirectToRepository}>
          <Text fontWeight={"bold"} style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.redButton} onPress={confirmDeleteReview}>
          <Text fontWeight={"bold"} style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Review = ({ review, showUserButtons }) => {
  if (!review) return;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
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
      {showUserButtons && <UserButtons review={review} />}
    </View>
  );
};

export default Review;
