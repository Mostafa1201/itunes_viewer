import notes from "@itunes-search-backend/core/notes";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("event: ", event);
  //@ts-ignore
  const note = notes[event.pathParameters.id];

  if (!note) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }
  //@ts-ignore
  const data = JSON.parse(event.body);

  note.content = data.content;

  return {
    statusCode: 200,
    body: JSON.stringify(note),
  };
};