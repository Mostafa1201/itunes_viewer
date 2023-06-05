import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { Constants } from "@itunes-search/core/src/utilities/constants";
import { StorageStack } from "./stacks/StorageStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: Constants.AppName,
      region: Constants.Region,
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(FrontendStack);
  }
} satisfies SSTConfig;
