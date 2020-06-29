import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import handler from '../libs/lambdaHandler';
import dynamoDb from '../libs/dynamodb';

const updatePost = async (event: EventHandler) => {
  const data = JSON.parse(event.body);
  const TableName = process.env.tableName as string;
  const userId = event.requestContext.identity.cognitoIdentityId;
  const postId = event.pathParameters.id;
  let params: DocumentClient.GetItemInput | DocumentClient.UpdateItemInput;

  params = {
    TableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'postId': path parameter
    Key: {
      userId,
      postId,
    },
  };

  const getResult = await dynamoDb.get(params);

  if (!getResult.Item) {
    throw new Error('Item not found');
  }

  params = {
    // spread out exisiting param values
    ...params,

    // 'UpdateExpression' defines the attributes to be updated
    UpdateExpression: 'SET content = :content, attachment = :attachment',

    //  'ExpressionAttributeValues' defines the value in the update expression
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },

    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
};

export default handler(updatePost);
