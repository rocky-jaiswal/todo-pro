import { createTRPCRouter } from './trpc'

import { healthCheckRouter } from './routers/healthCheckRouter'
import { sessionsRouter } from './routers/session'
import { usersRouter } from './routers/users'
import { homeRouter } from './routers/home'

export const appRouter = createTRPCRouter({
  health: healthCheckRouter,
  sessions: sessionsRouter,
  users: usersRouter,
  home: homeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
