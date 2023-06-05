import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import ItuneResponseObject from "@itunes-search/core/types/ItuneResponseObject";
import badRequestResponse from "@itunes-search/core/responses/badRequestResponse";
import notFoundResponse from "@itunes-search/core/responses/notFoundResponse";
import sucessResponse from "@itunes-search/core/responses/sucessResponse";
import Database from "@itunes-search/core/utilities/database";
import { Constants } from "@itunes-search/core/src/utilities/constants";

const mapResponseObject = (results: any) :ItuneResponseObject[] => {
  let mappedResults = [];
  for(let result of results){
    mappedResults.push({
      kind: result.kind,
      artistName: result.kind,
      collectionName: result.collectionName,
      trackId: result.trackId,
      trackName: result.trackName,
      trackViewUrl: result.trackViewUrl,
      trackCount: result.trackCount,
      trackPrice: result.trackPrice,
      trackTimeMillis: result.trackTimeMillis,
      previewUrl: result.previewUrl,
      collectionPrice: result.collectionPrice,
      releaseDate: result.releaseDate,
      country: result.country,
      currency: result.currency,
      primaryGenreName: result.primaryGenreName,
      shortDescription: result.shortDescription,
      longDescription: result.longDescription,
    })
  }
  return mappedResults;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const searchQuery = event.queryStringParameters;
  if (!searchQuery || !searchQuery.term) {
    return badRequestResponse("Seach query is empty");
  }
  try {
    const response = await axios.get(
      `${Constants.ItunesURI}/search?term=${searchQuery.term}`
    );
    if (!response.data || !response.data.results) {
      return notFoundResponse("Not Found");
    }
    const results = mapResponseObject(response.data.results);
    await Database.create('taher-itunes-search-Tracks', results);
    return sucessResponse(results);
  } catch (error: any) {
    console.error(error);
    return badRequestResponse(error.message);
  }
};
