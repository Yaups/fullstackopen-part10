import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const res = await authenticate({ variables: { username, password } });

    return res;
  };

  return [signIn, result];
};

export default useSignIn;
