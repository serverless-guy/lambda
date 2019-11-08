import { Headers } from "./headers.type";

export interface Response {
  headers?: Headers;

  isBase64Encoded?: boolean;
}
