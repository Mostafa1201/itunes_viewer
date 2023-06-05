import notes from "@itunes-search/core/notes";

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
}
