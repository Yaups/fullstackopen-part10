import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $review
      }
    ) {
      repositoryId
    }
  }
`;
