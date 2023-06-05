import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";
import { Constants } from "@itunes-search-backend/core/src/utilities/constants";

export default {
  config(_input) {
    return {
      name: Constants.AppName,
      region: Constants.Region,
    };
  },
  stacks(app) {
    app.stack(ExampleStack);
  }
} satisfies SSTConfig;
