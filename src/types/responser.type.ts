import { Headers } from "./headers.type";
import { ResponseBody } from "./responseBody.type";

export type Responser = (data: ResponseBody, statusCode?: number, headers?: Headers) => any;
 