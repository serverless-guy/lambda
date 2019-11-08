import { Context } from "aws-lambda";
import { Event } from "./event.type";

export type Request = {
  /**
   * AWS Event
   * @type Event
   */
  event: Event;

  /**
   * AWS Context
   * @type Context
   */
  context: Context;
};
