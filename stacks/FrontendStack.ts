import { StaticSite, use, StackContext } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }: StackContext) {
  // TODO: remove as any and find the needed type
  const { api } = use(ApiStack);
  // Define our Next app
  // we transmit the outputs from the ApiStack as environment variables in React
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: api.url
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000",
  });
  return {
    site
  };
}