import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from 'axios';
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("event: ", event);
  const response = await axios.get('https://itunes.apple.com/search?term=jack+johnson');
  //@ts-ignore
  const data = response.data;
  return data
    ? {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
