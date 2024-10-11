import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import type { Task, TaskList } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const taskListRouter = createTRPCRouter({
  getListDetails: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `${env.MAIN_API_URL}/v1/task-lists/${input.id}`,
          {
            method: 'get',
            headers: {
              authorization: `Bearer ${ctx.session.token ?? ''}`,
              'Content-Type': 'application/json',
            },
          }
        )

        const listDetails = (await response.json()) as unknown

        return listDetails as TaskList
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),
  getTasksForList: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `${env.MAIN_API_URL}/v1/task-lists/${input.id}/tasks/`,
          {
            method: 'get',
            headers: {
              authorization: `Bearer ${ctx.session.token ?? ''}`,
              'Content-Type': 'application/json',
            },
          }
        )

        await new Promise((res) => setTimeout(res, 1000))

        const tasks = (await response.json()) as unknown

        return tasks as Task[]
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