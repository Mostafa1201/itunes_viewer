import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios";
import ItuneResponseObject from "@itunes-search/core/types/ItuneResponseObject";
import badRequestResponse from "@itunes-search/core/responses/badRequestResponse";
import notFoundResponse from "@itunes-search/core/responses/notFoundResponse";
import sucessResponse from "@itunes-search/core/responses/sucessResponse";
import Database from "@itunes-search/core/utilities/database";
import { Constants } from "@itunes-search/core/utilities/constants";

const mapResponseObject = (results: ItuneResponseObject[]) :ItuneResponseObject[] => {
  let mappedResults = [];
  for(let result of results){
    mappedResults.push({
      kind: result.kind,
      artistName: result.artistName,
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
    const url = `${Constants.ItunesURI}/search?term=${searchQuery.term}`;
    const response = await axios.get(url);
    if (!response.data || !response.data.results) {
      return notFoundResponse("Not Found");
    }
    const results = mapResponseObject(response.data.results);
    const tracks = await Database.create(Constants.TracksTableFullName, results);
    return sucessResponse(tracks);
  } catch (error: any) {
    console.error(error);
    return badRequestResponse(error.message);
  }
};
