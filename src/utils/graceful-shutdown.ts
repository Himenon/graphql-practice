import type * as http from "http";

export const deferGracefulShutdown = (httpServer: http.Server): void => {
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
