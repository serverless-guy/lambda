import { Responser } from "@lambda/types/responser.type";
import { Context } from "aws-lambda";
import { Event } from "@lambda/types/event.type";

export type ErrorResponser = (error: Error, event: Event, context: Context, response: Responser) => any; // eslint-disable-line
