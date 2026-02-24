import { faker } from "@faker-js/faker";

import { v4 as uuid } from "uuid";
import { VerifiableCredential } from "../types/did.types";

export const generateVC = (
  did: string,
  name: string,
  email: string,
): VerifiableCredential => {
  return {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: uuid(),
    type: ["VerifiableCredential"],
    issuer: "did:cyberyan:issuer",
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: did,
      name,
      email,
      passportNumber: faker.string.alphanumeric(8),
    },
  };
};
