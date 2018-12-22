export declare function lambdaFunctionWithSuccessResponse(event: any, response: any): any;
export declare function lambdaFunctionBadRequest(event: any, response: any): any;
export declare function lambdaFunctionResponseFunctionNotUsed(event: any): {
    hello: string;
};
export declare function lambdaFunctionWithPromise(event: any, response: any): Promise<any>;
export declare function lambdaFunctionWithPromiseResponseFunctionNotUsed(event: any): Promise<{
    hello: string;
}>;
export declare function lambdaWrapErrorHandler(event: any, error: any): any;
export declare function invalidInputLambda(event: any, response: any): Promise<{}>;
export declare function preprocessorHandler(event: any, context: any): void;
