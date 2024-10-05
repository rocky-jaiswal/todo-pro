import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import pino from 'pino'

import { validateCookie } from '../lib/token'

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
// type CreateContextOptions = Record<string, never>

const logger = pino()

const createInnerTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  const validated = await validateCookie(req.cookies.token)

  const session = { userId: validated?.id, token: validated?.jwt }

  return {
    req,
    res,
    logger,
    session,
  }
}

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext(opts)
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const createTRPCRouter = t.router

const loggerMiddleware = t.middleware(async ({ ctx, path, type, next }) => {
  ctx.logger.info(`Request: - ${JSON.stringify({ path, type })}`)

  return next({
    ctx,
  })
})

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session.userId || !ctx.session.token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx,
  })
})

export const publicProcedure = t.procedure.use(loggerMiddleware)
export const protectedProcedure = publicProcedure.use(enforceUserIsAuthed)
