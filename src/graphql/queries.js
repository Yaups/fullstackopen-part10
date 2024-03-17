import { gql } from "@apollo/client";
import { CORE_REVIEW_FIELDS, CORE_REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String!
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...CoreRepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${CORE_REVIEW_FIELDS}
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...CoreReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const USER_INFO = gql`
  ${CORE_REVIEW_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...CoreReviewFields
            repositoryId
          }
        }
      }
    }
  }
`;
