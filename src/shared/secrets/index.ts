import { SecretsManager } from "aws-sdk";

const secrets = new SecretsManager({
  region: process.env.AWS_REGION_LOCATION,
});

export async function otrsConnectionDB() {
  const auth = await secrets
    .getSecretValue({
      SecretId: process.env.STAGE + "-otrs-db-credentials",
    })
    .promise();

  return JSON.parse(auth.SecretString);
}

export async function webserviceUser() {
  const user = await secrets
    .getSecretValue({
      SecretId: process.env.STAGE + "-otrs-webservice-user",
    })
    .promise();

  return JSON.parse(user.SecretString);
}
