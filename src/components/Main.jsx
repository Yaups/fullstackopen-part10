import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import IndividualRepository from "./IndividualRepository";
import AppBar from "./AppBar";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ReviewForm from "./ReviewForm";
import UserReviews from "./UserReviews";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:repositoryId" element={<IndividualRepository />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/reviewForm" element={<ReviewForm />} />
        <Route path="/userReviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
