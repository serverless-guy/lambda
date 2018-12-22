/**
 * Wraps lambda function to skip ugly things
 * @param func lambda function
 * @param preprocessAction what lambda should do before executing the other logic
 * @param errorHandler customized error handler
 */
export declare function lambdaWrap(func: any, preprocessAction?: any, errorHandler?: any): (event: any, context: any) => any;
