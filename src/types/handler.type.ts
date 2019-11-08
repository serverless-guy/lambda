import { Request } from "./request.type";

export type Handler = (request: Request, next, response) => Promise<any>;
