import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const healthCheckRouter = createTRPCRouter({
  publicCheck: publicProcedure.query(() => {
    return { success: true }
  }),
  protectedCheck: protectedProcedure.query(() => {
    return { success: true }
  }),
})
