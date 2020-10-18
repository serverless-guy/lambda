import { Event } from "@lambda/types/event.type";
import { Responser } from "@lambda/types/responser.type";
import { Context } from "aws-lambda";

export type Handler = (event: Event, context: Context, response: Responser) => Promise<any>; // eslint-disable-line
