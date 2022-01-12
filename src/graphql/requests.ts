import { gql } from "apollo-boost";

export const GET_ORGANIZATION = gql`
  {
    organization(login: "facebook") {
      name
      url
    }
  }
`;

export const GET_ORGANIZATION_QUERY = gql`
  query ($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query ($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;

export const GET_ISSUES_OF_REPOSITORY = gql`
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: OPEN) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              url
              reactions(first: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
                totalCount
              }
              updatedAt
            }
          }
          totalCount
        }
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation RemoveStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;
