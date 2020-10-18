import { Handler } from "@lambda/types/handler.type";
import { Wrapper } from "@lambda/types/wrapper.type";
import { defaultCatch } from "@lambda/responses/defaultCatch";
import { Event } from "@lambda/types/event.type";
import { Context } from "aws-lambda";
import { defaultResponse } from "@lambda/responses/defaultResponse";
import { WrapperProperties } from "./types/wrapperProperties.type";
import { Responser } from "./types/responser.type";
import { ErrorResponser } from "./types/errorResponser.type";
 
function wrapper(handler: Handler): Wrapper {
  const props: WrapperProperties = {
    responseFunction: defaultResponse,
    catchFunction: defaultCatch
  };

  const actualHandler: Wrapper = async (event: Event, context: Context) => {
    try {
      const resolved = await handler(event, context, props.responseFunction);

      return resolved;
    } catch (error) {
      return props.catchFunction(error, event, context, props.responseFunction);
    }
  };

  const setPropsFunction = (fn: Responser, propName: string): Wrapper => {
    props[propName] = fn;

    return this;
  } 

  actualHandler.setResponseFunction = (fn: ErrorResponser): Wrapper => setPropsFunction(fn, "responseFunction");

  actualHandler.setCatchFunction = (fn: ErrorResponser): Wrapper => setPropsFunction(fn, "catchFunction");

  return actualHandler;
}

export {
  wrapper
}
