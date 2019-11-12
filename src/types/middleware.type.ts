import { Request } from "./request.type";
import { Next } from "./next.type";

export type Middleware = (request: Request, next: Next) => Promise<Middleware> | Middleware | void;
