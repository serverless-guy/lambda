import { Request } from "./request.type";

export type Middleware = (request: Request, next: Middleware) => Middleware;
