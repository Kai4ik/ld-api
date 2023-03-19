import { CognitoJwtVerifier } from "aws-jwt-verify";
import { pino } from "pino";

const logger = pino();

export const verifyUser = async (token: string) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env["USER_POOL_ID"] as string,
    tokenUse: "id",
    clientId: process.env["USER_POOL_CLIENT_ID"] as string,
  });
  try {
    const payload = await verifier.verify(token);
    return { payload: payload, verified: true };
  } catch (e) {
    logger.error(e);
    logger.info("Token validation failed!");
    return { error: e, verified: false };
  }
};
