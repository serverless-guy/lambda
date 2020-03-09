import { Responser } from "./responser.type";
import { Request } from "./request.type";

export type ErrorResponser = (error: Error, request: Request, response: Responser) => any; // eslint-disable-line
