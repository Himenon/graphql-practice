import express from "express";
import type * as http from "http";

import * as Graphql from "./middlewares/graphql";

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", error => {
  console.error(error);
});

const createApp = () => {
  const app = express();
  app.use("/graphql", Graphql.createGraphqlMiddleware());
  return app;
};

export const createServer = (): http.Server => {
  const app = createApp();
  return app.listen(PORT, () => {
    console.log(`Serve[${process.env.APP_VERSION}] start: http://0.0.0.0:${PORT}`);
  });
};
