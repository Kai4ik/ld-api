import AWS from "aws-sdk";

type Response = {
  loggedIn: boolean;
  token?: string;
};

export const getJwt = async (
  username: string,
  password: string
): Promise<Response> => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
    {
      region: "us-east-1",
    }
  );

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const result = await cognitoidentityserviceprovider
      .initiateAuth(params)
      .promise();
    return { loggedIn: true, token: result.AuthenticationResult?.IdToken };
  } catch (e) {
    return { loggedIn: false };
  }
};
