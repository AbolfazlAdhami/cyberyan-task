import { v4 as uuid } from "uuid";

export const generateDID = (): string => {
  return `did:${uuid()}`;
};
