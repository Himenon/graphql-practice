import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
type Query {
  quoteOfTheDay: String
  random: Float!
  rollThreeDice: [Int]
  rollDice(numDice: Int!, numSides: Int): [Int]
}
`);

const rootValue = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: (args: { numDice: number; numSides?: number }) => {
    const output = [];
    for (let i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
};

export const createGraphqlMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  });
};
