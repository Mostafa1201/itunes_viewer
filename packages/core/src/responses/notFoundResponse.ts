const notFoundResponse = (msg: string) => {
    return {
      statusCode: 404,
      headers: { "Content-Type": "text/plain" },
      body: msg,
    };
  };
  
  export default notFoundResponse;
  