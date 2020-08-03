import { Responser } from "@lambda/types/responser.type";
import { Request } from "@lambda/types/request.type";

export type ErrorResponser = (error: Error, request: Request, response: Responser) => any; // eslint-disable-line
