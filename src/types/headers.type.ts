import { APIGatewayProxyResult } from "aws-lambda";

export type Headers = NonNullable<APIGatewayProxyResult["headers"]>;
