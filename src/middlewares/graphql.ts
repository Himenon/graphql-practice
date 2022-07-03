import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { RandomDie } from "../graphql-schema/RandomDie";

const schema = buildSchema(`
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
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
  getDie: ({ numSides }: { numSides: number }) => {
    return new RandomDie(numSides || 6);
  },
};

export const createGraphqlMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  });
};
