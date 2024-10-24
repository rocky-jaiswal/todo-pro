import type { TaskList } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { sendServerRequest } from '../../lib/serverRequest'

export const homeRouter = createTRPCRouter({
  findUserAndLists: protectedProcedure.query(async ({ ctx }) => {
    await sendServerRequest(
      `${env.MAIN_API_URL}/v1/users/`,
      'post',
      JSON.stringify({ userId: ctx.session.userId }),
      'fetching data for home page',
      ctx.logger,
      ctx.session.token
    )

    const responseBody = await sendServerRequest(
      `${env.MAIN_API_URL}/v1/task-lists/`,
      'get',
      undefined,
      'fetching data for home page',
      ctx.logger,
      ctx.session.token
    )

    return responseBody as TaskList[]
  }),
})
