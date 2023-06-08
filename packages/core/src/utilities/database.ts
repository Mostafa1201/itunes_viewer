import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import ItuneResponseObject from "../types/ItuneResponseObject";
import ItuneTrackModel from "../types/ItuneTrackModel";

const dynamoDb = new DynamoDB.DocumentClient();

type DynamodbTrackItems = {
  PutRequest : {
    Item: ItuneTrackModel
  }
}

class Database {
  static async create(
    tableName: string,
    results: ItuneResponseObject[]
  ): Promise<ItuneTrackModel[]> {
    let items: DynamodbTrackItems[] = [];
    let tracks: ItuneTrackModel[] = [];
    let size = results.length;
    let params;
    let row;
    for (let i = 0; i < size; i++) {
      row = { id: uuid.v4(), ...results[i] };
      items.push({
        PutRequest: {
          Item: row,
        },
      });
      tracks.push(row);
      // Since dynamodb has a limit of 25 inserts at a time , we chunk the data into 25 records per chunk and
      // insert each chunk into the database with 1 api call per chunk, This way we reduce the api calls significantly
      // For example if we had 50 records instead of calling the api 50 times we call it only 2 times
      if ((i + 1) % 25 === 0 || i + 1 === size) {
        params = {
          RequestItems: {
            [tableName]: items,
          },
        };
        await dynamoDb.batchWrite(params).promise();
        items = [];
      }
    }
    return tracks;
  }
}

export default Database;
