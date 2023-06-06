import { StackContext, Table } from "sst/constructs";
import { Constants } from "@itunes-search/core/src/utilities/constants";

export function StorageStack({ stack }: StackContext) {
  const tracksTable = new Table(stack, Constants.TracksTableName, {
    fields: {
      id: "string",
      kind: "string",
      trackId: "number",
      trackName: "string",
      trackViewUrl: "string",
      trackCount: "number",
      trackPrice: "number",
      trackTimeMillis: "number",
      previewUrl: "string",
      collectionPrice: "number",
      releaseDate: "string",
      country: "string",
      currency: "string",
      primaryGenreName: "string",
      shortDescription: "string",
      longDescription: "string"
    },
    primaryIndex: { partitionKey: "id" },
  });

  return {
    tracksTable,
  };
}
