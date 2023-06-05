import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import ItuneResponseObject from "../types/ItuneResponseObject";

const dynamoDb = new DynamoDB.DocumentClient();

class Database {
  static async create(tableName: string, results: ItuneResponseObject[]): Promise<void> {
    let items: any[] = [];
    let size = results.length;
    let params;
    for (let i = 0; i < size; i++) {
      items.push({
        PutRequest: {
          Item: { id: uuid.v4(), ...results[i] },
        },
      });
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
  }
}

export default Database;
