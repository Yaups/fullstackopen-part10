import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import useReview from "../hooks/useReview";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
  },
  inputError: {
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.error,
    padding: 10,
  },
  flexComponent: { margin: 10 },
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

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .integer("Rating must be a whole number")
    .lessThan(101, "Rating must be between 0 and 100")
    .moreThan(-1, "Rating must be between 0 and 100"),
  review: yup.string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [postReview] = useReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const valuesToPost = {
        ownerName,
        repositoryName,
        rating: Number(rating),
      };
      if (review) valuesToPost.review = review;

      const data = await postReview(valuesToPost);

      const repositoryId = data.createReview.repositoryId;
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.error(e.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexComponent}>
        <TextInput
          style={
            formik.touched.ownerName && formik.errors.ownerName
              ? styles.inputError
              : styles.input
          }
          autoCapitalize="none"
          placeholder="Repository owner name *"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.ownerName}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={
            formik.touched.repositoryName && formik.errors.repositoryName
              ? styles.inputError
              : styles.input
          }
          autoCapitalize="none"
          placeholder="Repository name *"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.repositoryName}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={
            formik.touched.rating && formik.errors.rating
              ? styles.inputError
              : styles.input
          }
          autoCapitalize="none"
          placeholder="Rating between 0 and 100 *"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={styles.input}
          multiline
          autoCapitalize="sentences"
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange("review")}
        />
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
