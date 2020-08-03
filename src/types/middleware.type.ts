import { Request } from "@lambda/types/request.type";
import { Next } from "@lambda/types/next.type";

export type Middleware = (request: Request, next: Next) => Promise<Middleware> | Middleware | void;
