import { init } from "./graphql-server";

init().catch(error => {
  console.error(error);
});

console.log("Start");
