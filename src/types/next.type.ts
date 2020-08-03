import { Request } from "@lambda/types/request.type";

export type Next = (request: Request) => never;
