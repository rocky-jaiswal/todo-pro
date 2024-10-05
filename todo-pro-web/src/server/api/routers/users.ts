import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { env } from '../../../env/server.mjs'
import { createCookie, encryptToken } from '../../lib/token'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        confirmedPassword: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const response = await fetch(`${env.AUTH_SERVER_URL}/v1/users`, {
          method: 'post',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' },
        })

        const responseBody = (await response.json()) as Record<string, string>
        const token = await encryptToken(responseBody.token as string)

        ctx.res.setHeader('Set-Cookie', createCookie(token))

        return {}
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),

  createGoogleUser: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(`${env.AUTH_SERVER_URL}/v1/login/google`, {
          method: 'post',
          body: JSON.stringify({ code: input.code }),
          headers: { 'Content-Type': 'application/json' },
        })

        const responseBody = (await response.json()) as Record<string, string>
        // console.log('======================')
        // console.log(responseBody)
        // console.log('======================')
        const token = await encryptToken(responseBody.token as string)

        ctx.res.setHeader('Set-Cookie', createCookie(token))

        return {}
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),

  userDetails: protectedProcedure.query(async ({ ctx }) => {
    try {
      const response = await fetch(`${env.AUTH_SERVER_URL}/v1/user`, {
        method: 'get',
        headers: {
          authorization: `token ${ctx.session.token ?? ''}`,
        },
      })

      const responseBody = (await response.json()) as Record<string, string>
      return { email: responseBody.email }
    } catch (err) {
      ctx.logger.error(err)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
        message: 'An unexpected error occurred, please try again later.',
        cause: err,
      })
    }
  }),
})
