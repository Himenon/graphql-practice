import express from "express";

import * as GraphQL from "./graphql-middleware";

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", error => {
  console.error(error);
});

const createApp = () => {
  const app = express();
  app.use("/graphql", GraphQL.createGraphQLRouter());
  return app;
};

export const init = async () => {
  const app = createApp();

  let serverClosing = false;

  const startClose = (reason: string) => {
    if (serverClosing) {
      return;
    }
    serverClosing = true;
    console.log(`Start Close Serve by ${reason}r`);
    httpServer.close(() => {
      console.log(`Terminated by ${reason}`);
    });
  };

  const httpServer = app.listen(PORT, () => {
    console.log(`Serve[${process.env.APP_VERSION}] start: http://0.0.0.0:${PORT}`);
  });

  process.on("SIGTERM", () => {
    startClose("SIGTERM");
  });

  process.on("SIGINT", () => {
    startClose("SIGINT");
  });

  process.on("SIGHUP", () => {
    startClose("SIGHUP");
  });
};
