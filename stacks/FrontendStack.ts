import { StaticSite, use, StackContext, NextjsSite } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  // Define our Next app
  // we transmit the outputs from the ApiStack as environment variables in nextjs
  const site = new NextjsSite(stack, "NextjsSite", {
    environment: {
      API_URL: api.url
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3001",
  });
  return {
    site
  };
}