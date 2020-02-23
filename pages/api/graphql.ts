import { ApolloServer } from "apollo-server-micro";
import { createContext } from "./_context";
import { schema } from "./_schema";

const apolloServer = new ApolloServer({
  schema,
  context: createContext(),
  playground: true,
  introspection: true
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
