import "cross-fetch/polyfill";
import ApolloClient from "apollo-boost";
import { config } from "dotenv";
import { GET_ISSUES_OF_REPOSITORY } from "./graphql/requests";

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
