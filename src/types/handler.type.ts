import { Request } from "@lambda/types/request.type";
import { Responser } from "@lambda/types/responser.type";

export type Handler = (request: Request, response: Responser) => Promise<any>; // eslint-disable-line
