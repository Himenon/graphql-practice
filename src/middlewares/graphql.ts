import { randomBytes } from "crypto";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { Message, MessageArgs } from "../graphql-schema/Message";
import { RandomDie } from "../graphql-schema/RandomDie";

const schema = buildSchema(`
input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
}

type Query {
  getMessage(id: ID!): Message
}

type Mutation {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
`);

const fakeDatabase: Record<string, MessageArgs> = {};

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
  getMessage: ({ id }: { id: string }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }: { input: MessageArgs }) => {
    // Create a random id for our "database".
    const id = randomBytes(10).toString("hex");
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }: { id: string; input: MessageArgs }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

export const createGraphqlMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  });
};
