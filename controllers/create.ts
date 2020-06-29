import * as uuid from 'uuid';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import handler from '../libs/lambdaHandler';
import dynamoDb from '../libs/dynamodb';

const createPost = async (event: EventHandler) => {
  const data = JSON.parse(event.body);
  const params: DocumentClient.PutItemInput = {
    TableName: process.env.tableName as string,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'postId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };
  console.log('testing');

  await dynamoDb.put(params);

  return params.Item;
};

export default handler(createPost);
