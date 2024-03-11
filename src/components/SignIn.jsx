import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
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
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(
      `Username is ${values.username}. Password is ${values.password}.`
    );
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
        {formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View style={styles.flexComponent}>
        <TextInput
          style={formik.errors.password ? styles.inputError : styles.input}
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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight={"bold"} style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;