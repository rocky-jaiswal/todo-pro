import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import type { Task } from '../../types'

import { env } from '../../../env/server.mjs'
import { createTRPCRouter, protectedProcedure } from '../trpc'

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
      try {
        const response = await fetch(`${env.MAIN_API_URL}/v1/tasks/`, {
          method: 'post',
          body: JSON.stringify({
            name: input.name,
            description: input.description,
            dueBy: input.dueBy,
            listId: input.listId,
          }),
          headers: {
            authorization: `Bearer ${ctx.session.token ?? ''}`,
            'Content-Type': 'application/json',
          },
        })

        const body = (await response.json()) as unknown
        return body as Task
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),
  markAsCompleted: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `${env.MAIN_API_URL}/v1/tasks/${input.id}/completion/`,
          {
            method: 'post',
            headers: {
              authorization: `Bearer ${ctx.session.token ?? ''}`,
              'Content-Type': 'application/json',
            },
          }
        )

        const body = (await response.json()) as unknown
        return body as Task
      } catch (err) {
        ctx.logger.error(err)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR', // TODO: check / change error type based on err
          message: 'An unexpected error occurred, please try again later.',
          cause: err,
        })
      }
    }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await fetch(
          `${env.MAIN_API_URL}/v1/tasks/${input.id}/`,
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
