import type { Logger } from 'pino'

import ApplicationError from './applicationError'
import { TRPCError } from '@trpc/server'

export const sendServerRequest = async (
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body: BodyInit | undefined,
  context: string,
  logger: Logger,
  token?: string
) => {
  try {
    let headers = { 'Content-Type': 'application/json' }

    if (token) {
      headers = Object.assign(headers, {
        authorization: `Bearer ${token ?? ''}`,
      })
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
    })

    if (!response.ok) {
      throw new ApplicationError(
        `Error in ${context}`,
        response.status,
        `Server responded with ${response.status}`
      )
    }

    const responseBody = (await response.json()) as unknown
    return responseBody
  } catch (err) {
    logger.error(err)
    const error = err as Error

    let code = null
    if ('code' in error) {
      code = error.code
    }

    throw new TRPCError({
      code:
        code && code.toString().startsWith('4')
          ? 'BAD_REQUEST'
          : 'INTERNAL_SERVER_ERROR',
      message:
        error.message ??
        'An unexpected error occurred, please try again later.',
      cause: err,
    })
  }
}
