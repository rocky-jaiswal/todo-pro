import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { env } from '../../../env/server.mjs'
import { createCookie, encryptToken } from '../../lib/token'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const sessionsRouter = createTRPCRouter({
  createSession: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(`${env.AUTH_SERVER_URL}/v1/sessions`, {
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

  getGoogleUrl: publicProcedure.query(async ({ ctx }) => {
    try {
      const response = await fetch(`${env.AUTH_SERVER_URL}/login/google`, {
        method: 'get',
        redirect: 'manual',
      })

      const headers = response.headers
      return headers.get('location')
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
