import { Request } from "./request.type";
import { Responser } from "./responser.type";

export type Handler = (request: Request, response: Responser) => Promise<any>; // eslint-disable-line
