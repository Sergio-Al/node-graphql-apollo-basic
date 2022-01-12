import "cross-fetch/polyfill";
import ApolloClient from "apollo-boost";
import { config } from "dotenv";
import {
  ADD_STAR,
  GET_ISSUES_OF_REPOSITORY,
  REMOVE_STAR,
} from "./graphql/requests";

config(); // config my env variables

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.PERSONAL_ACCESS_TOKEN_GITHUB}`,
      },
    });
  },
});

// Query
client
  .query({
    query: GET_ISSUES_OF_REPOSITORY,
    variables: {
      organization: "facebook",
      repository: "jest",
    },
  })
  .then((res) => {
    console.log(
      res.data.organization.repository,
      res.data.organization.repository.issues.edges
    );
  });

// Mutation Add Star
client
  .mutate({
    mutation: ADD_STAR,
    variables: {
      repositoryId: "MDEwOlJlcG9zaXRvcnkxNTA2Mjg2OQ==", // facebook/jest id
    },
  })
  .then((res) => console.log("StarAdded", res));

// Mutation Remove Star
client
  .mutate({
    mutation: REMOVE_STAR,
    variables: {
      repositoryId: "MDEwOlJlcG9zaXRvcnkxNTA2Mjg2OQ==", // facebook/jest id (do not use ADD_STAR and REMOVE_STAR at the same time!)
    },
  })
  .then((res) => console.log("Star Removed!", res));
