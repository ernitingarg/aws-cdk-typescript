import * as express from "express";
import * as aws from "aws-sdk";
import env from "./config";

const app = express();

// Health check endpoint
app.get("/healthcheck", (_req: express.Request, res: express.Response) => {
  res.status(200);
  res.send("OK");
});

app.get("/generate", async (_req: express.Request, res: express.Response) => {
  const documentClient = new aws.DynamoDB.DocumentClient();

  const randomNumber = Date.now().toString();
  const params = {
    TableName: env.AWS_DYNAMODB_TABLE_NAME || "",
    Item: {
      Id: randomNumber,
    },
  };

  try {
    await documentClient.put(params).promise();
    res.status(200).json({
      message: `Random number ${randomNumber} added to DynamoDB`,
    });
  } catch (error) {
    console.error("Error saving to DynamoDB:", error);
    res.status(500).json({ message: `Error saving to DynamoDB: ${error}` });
  }
});

const port = env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
