import { buildSchema, graphql } from "graphql";

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

export const init = async () => {
  const res = await graphql({
    schema,
    source: "{ hello }",
    rootValue,
  });
  console.log(JSON.stringify(res, null, 2));
};
