import { z } from 'zod'

import type { Task, TaskList } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { sendServerRequest } from '../../lib/serverRequest'

export const taskListRouter = createTRPCRouter({
  createTaskList: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(150).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responseBody = await sendServerRequest(
        `${env.MAIN_API_URL}/v1/task-lists/`,
        'post',
        JSON.stringify({
          name: input.name,
          description: input.description,
        }),
        'creating task list',
        ctx.logger,
        ctx.session.token
      )

      return responseBody as TaskList
    }),
  getListDetails: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const responseBody = await sendServerRequest(
        `${env.MAIN_API_URL}/v1/task-lists/${input.id}`,
        'get',
        undefined,
        'fetching task list',
        ctx.logger,
        ctx.session.token
      )

      return responseBody as TaskList
    }),
  getTasksForList: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const responseBody = await sendServerRequest(
        `${env.MAIN_API_URL}/v1/task-lists/${input.id}/tasks/`,
        'get',
        undefined,
        'fetching tasks for a list',
        ctx.logger,
        ctx.session.token
      )

      return responseBody as Task[]
    }),
  deleteList: protectedProcedure
    .input(
      z.object({
        listId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await sendServerRequest(
        `${env.MAIN_API_URL}/v1/task-lists/${input.listId}/`,
        'delete',
        undefined,
        'deleting task list',
        ctx.logger,
        ctx.session.token
      )

      return {}
    }),
  editList: protectedProcedure
    .input(
      z.object({
        listId: z.string().uuid(),
        name: z.string().min(1).max(50),
        description: z.string().max(150).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await sendServerRequest(
        `${env.MAIN_API_URL}/v1/task-lists/${input.listId}/`,
        'put',
        JSON.stringify({
          name: input.name,
          description: input.description,
        }),
        'editing task list',
        ctx.logger,
        ctx.session.token
      )

      return {}
    }),
})
