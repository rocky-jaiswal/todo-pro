import { z } from 'zod'

import type { Task } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { sendServerRequest } from '../../lib/serverRequest'

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(150).nullable(),
        dueBy: z.string().date().nullable(),
        listId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responseBody = (await sendServerRequest(
        `${env.MAIN_API_URL}/v1/tasks/`,
        'post',
        JSON.stringify({
          name: input.name,
          description: input.description,
          dueBy: input.dueBy,
          listId: input.listId,
        }),
        'creating task',
        ctx.logger,
        ctx.session.token
      )) as Task

      return responseBody
    }),
  markAsCompleted: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responseBody = (await sendServerRequest(
        `${env.MAIN_API_URL}/v1/tasks/${input.id}/completion/`,
        'post',
        undefined,
        'completing task',
        ctx.logger,
        ctx.session.token
      )) as Task

      return responseBody
    }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const _responseBody = (await sendServerRequest(
        `${env.MAIN_API_URL}/v1/tasks/${input.id}/`,
        'delete',
        undefined,
        'deleting task',
        ctx.logger,
        ctx.session.token
      )) as Task

      return {}
    }),
})
