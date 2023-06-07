# Itunes Viewer (Serverless Application)

* This is an Itunes data viewer application developed using SST framework for serverless architecture.
* An AWS account and AWS cli are required when developing this app.
* This application uses server side rendering through next js.
* Please read SST docs here: https://docs.sst.dev/
* I wrapped pages folder name in Parenthesis so that I can group all pages in one folder. (since Next Js updated their folder structure in version 13). 

# Using the application
* This application is deployed on this link: https://d1cho7kx65zdgj.cloudfront.net
* It contains simple search field , type any term you want and it will extract Itunes tracks that have that term
* After that It will save these data inside dynamodb

# Development
# Installation

## Linux

```bash
npm install
npm run dev
```
# Deployment

## Linux

```bash
npm run deploy
```



