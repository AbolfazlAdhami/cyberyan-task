export interface RegisterInput {
  name: string;
  email: string;
  passportImage: string;
  selfieImage: string;
}

export interface VerifiableCredential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    name: string;
    email: string;
    passportNumber: string;
  };
}
