import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();

  const [authenticate, result] = useMutation(AUTHENTICATE_USER);

  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await authenticate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
