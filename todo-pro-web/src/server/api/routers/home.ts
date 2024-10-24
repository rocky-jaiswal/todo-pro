import { TRPCError } from '@trpc/server'

import type { TaskList } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const homeRouter = createTRPCRouter({
  findUserAndLists: protectedProcedure.query(async ({ ctx }) => {
    try {
      // this has a side effect of find or create user
      await fetch(`${env.MAIN_API_URL}/v1/users/`, {
        method: 'post',
        body: JSON.stringify({ userId: ctx.session.userId }),
        headers: {
          authorization: `Bearer ${ctx.session.token ?? ''}`,
          'Content-Type': 'application/json',
        },
      })

      const response = await fetch(`${env.MAIN_API_URL}/v1/task-lists/`, {
        method: 'get',
        headers: {
          authorization: `Bearer ${ctx.session.token ?? ''}`,
          'Content-Type': 'application/json',
        },
      })

      const responseBody = (await response.json()) as unknown

      return responseBody as TaskList[]
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
