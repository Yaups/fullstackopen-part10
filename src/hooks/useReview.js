import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const postReview = async ({ ownerName, repositoryName, rating, review }) => {
    const variables = { ownerName, repositoryName, rating };
    if (review) variables.review = review;

    const { data } = await createReview({ variables });

    return data;
  };

  return [postReview, result];
};

export default useReview;
