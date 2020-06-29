import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import handler from '../libs/lambdaHandler';
import dynamoDb from '../libs/dynamodb';

const listPosts = async (event: EventHandler) => {
  const params: DocumentClient.QueryInput = {
    TableName: process.env.tableName as string,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id of the authenticated user
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
};

export default handler(listPosts);
