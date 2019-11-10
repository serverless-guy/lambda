import { Responser } from "./responser.type";
import { Response } from "./response.type";

export type ErrorResponser = (error: Error, response: Responser) => Response;
