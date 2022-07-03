import { createServer } from "./server";
import { deferGracefulShutdown } from "./utils/graceful-shutdown";

const main = async () => {
  const httpServer = createServer();
  deferGracefulShutdown(httpServer);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
