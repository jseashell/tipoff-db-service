import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { ValidatedEventAPIGatewayProxyEvent } from './api-gateway';

export const middyfy = <T>(
  handler: ValidatedEventAPIGatewayProxyEvent<T>
): middy.MiddyfiedHandler => {
  return middy(handler).use(middyJsonBodyParser());
};
