import 'cross-fetch/polyfill';
import ApolloClient from "apollo-boost";
import { config } from "dotenv";

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
