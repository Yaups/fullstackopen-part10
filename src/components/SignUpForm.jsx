import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
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
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Length must be between 5 and 30 characters")
    .max(30, "Length must be between 5 and 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Length must be between 5 and 50 characters")
    .max(50, "Length must be between 5 and 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
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
            formik.touched.username && formik.errors.username
              ? styles.inputError
              : styles.input
          }
          autoCapitalize="none"
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={
            formik.touched.password && formik.errors.password
              ? styles.inputError
              : styles.input
          }
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? styles.inputError
              : styles.input
          }
          secureTextEntry
          autoCapitalize="none"
          placeholder="Confirm password"
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange("passwordConfirmation")}
        />
        {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation && (
            <Text style={{ color: theme.colors.error }}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
