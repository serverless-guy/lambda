import { Request } from "./request.type";

export type Next = (request: Request) => never;
