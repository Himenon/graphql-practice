import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const rootValue = {
  hello: () => {
    return "Hello world!";
  },
};

export const createGraphQLRouter = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  });
};
