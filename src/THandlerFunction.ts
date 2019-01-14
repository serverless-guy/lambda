import { TResponseFunction } from "@lambda/TResponseFunction"

export type THandlerFunction = (event: any, responser?: TResponseFunction) => any
