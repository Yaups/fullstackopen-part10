import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    await createUser({ variables: { username, password } });
  };

  return [signUp, result];
};

export default useSignUp;
