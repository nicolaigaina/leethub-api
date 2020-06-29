type EventHandler = {
  body: string;
  requestContext: {
    identity: {
      cognitoIdentityId: string;
    };
  };
  pathParameters: {
    id: string;
  };
}

type Lambda = (event: EventHandler, context: any) => Promise<any>;
