import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import type { Task, TaskList } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const taskListRouter = createTRPCRouter({
  createTaskList: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(150).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(`${env.MAIN_API_URL}/v1/task-lists/`, {
          method: 'post',
          body: JSON.stringify({
            name: input.name,
            description: input.description,
          }),
          headers: {
            authorization: `Bearer ${ctx.session.token ?? ''}`,
            'Content-Type': 'application/json',
          },
        })

        const responseBody = (await response.json()) as TaskList
        return responseBody
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),
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
  deleteList: protectedProcedure
    .input(
      z.object({
        listId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `${env.MAIN_API_URL}/v1/task-lists/${input.listId}/`,
          {
            method: 'delete',
            headers: {
              authorization: `Bearer ${ctx.session.token ?? ''}`,
              'Content-Type': 'application/json',
            },
          }
        )

        await response.json()
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
})
