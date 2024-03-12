import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          ratingAverage
          reviewCount
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const USER_INFO = gql`
  query {
    me {
      id
      username
    }
  }
`;
