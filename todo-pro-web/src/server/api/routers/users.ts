import { z } from 'zod'

import { env } from '../../../env/server.mjs'
import { createCookie, encryptToken } from '../../lib/token'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { sendServerRequest } from '../../lib/serverRequest'

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
      const responseBody = (await sendServerRequest(
        `${env.AUTH_SERVER_URL}/v1/users`,
        'post',
        JSON.stringify(input),
        'creating user',
        ctx.logger
      )) as Record<string, string>

      const token = await encryptToken(responseBody.token as string)

      ctx.res.setHeader('Set-Cookie', createCookie(token))

      return {}
    }),

  createGoogleUser: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responseBody = (await sendServerRequest(
        `${env.AUTH_SERVER_URL}/v1/login/google`,
        'post',
        JSON.stringify(input),
        'creating google user',
        ctx.logger
      )) as Record<string, string>

      const token = await encryptToken(responseBody.token as string)

      ctx.res.setHeader('Set-Cookie', createCookie(token))

      return {}
    }),

  userDetails: protectedProcedure.query(async ({ ctx }) => {
    const responseBody = (await sendServerRequest(
      `${env.AUTH_SERVER_URL}/v1/user`,
      'get',
      undefined,
      'getting user details',
      ctx.logger,
      ctx.session.token
    )) as Record<string, string>

    return { email: responseBody.email }
  }),
})
