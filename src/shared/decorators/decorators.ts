import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import {GqlExecutionContext} from '@nestjs/graphql';

export const ResGql = createParamDecorator(
  (data, context: ExecutionContext): Response => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().res;
  }
);

export const GqlUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  }
);
