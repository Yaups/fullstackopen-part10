import { gql } from "@apollo/client";

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
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
`;
