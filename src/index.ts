import "cross-fetch/polyfill";
import ApolloClient from "apollo-boost";
import { config } from "dotenv";
import {
  ADD_STAR,
  GET_ISSUES_OF_REPOSITORY,
  REMOVE_STAR,
} from "./graphql/requests";

import * as readline from "node:readline";
import { stdin as input, stdout as output } from "process";

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
    const { url, name, viewerHasStarred } = res.data.organization.repository;
    console.log(
      `Current URL: ${url}`,
      `\nCurrent Repository: ${name}`,
      `\nStar Status: ${
        viewerHasStarred
          ? "you have already placed a star"
          : "You haven't placed a star yet"
      }`
    );
    openQuestionListener();
  });

function addStar(): void {
  // Mutation Add Star
  client
    .mutate({
      mutation: ADD_STAR,
      variables: {
        repositoryId: "MDEwOlJlcG9zaXRvcnkxNTA2Mjg2OQ==", // facebook/jest id
      },
    })
    .then((res) => console.log("Star Added!", res));
}

// Mutation Remove Star
function removeStar(): void {
  client
    .mutate({
      mutation: REMOVE_STAR,
      variables: {
        repositoryId: "MDEwOlJlcG9zaXRvcnkxNTA2Mjg2OQ==", // facebook/jest id (do not use ADD_STAR and REMOVE_STAR at the same time!)
      },
    })
    .then((res) => console.log("Star Removed!", res));
}

// Start a stream process
function openQuestionListener() {
  const myReadLine = readline.createInterface({ input, output });

  myReadLine.question("Select and type: AddStar or RemoveStar: ", (answer) => {
    if (answer === "AddStar") {
      addStar();
    } else if (answer === "RemoveStar") {
      removeStar();
    } else {
      console.log("Please, select a correct option");
    }

    myReadLine.close(); // End the process
  });
}
