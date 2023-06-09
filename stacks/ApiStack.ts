import { Api, StackContext } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  // Create the HTTP API
  const api = new Api(stack, "Api", {
    routes: {
      "GET /search": "packages/functions/src/search.handler",
      "GET /list": "packages/functions/src/list.handler",
      "GET /notes/{id}": "packages/functions/src/get.handler",
      "PUT /notes/{id}": "packages/functions/src/update.handler",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return {
    api
  };
}