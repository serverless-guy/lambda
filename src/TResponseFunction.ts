import { IResponseFunctionResponse } from "@lambda/IResponseFunctionResponse"

export type TResponseFunction = (data: any, statusCode?: number, additionalOptions?: any) => IResponseFunctionResponse