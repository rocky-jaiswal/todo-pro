import type { JwtHeader, JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import Iron from '@hapi/iron'
import cookie from 'cookie'

import { env } from '../../env/server.mjs'

const client = jwksClient({
  jwksUri: `${env.AUTH_SERVER_URL}/.well-known/jwks.json`,
})

const getKey = async (header: JwtHeader) => client.getSigningKey(header.kid)

export const encryptToken = async (token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const sealed = await Iron.seal(token, `${env.SECRET}`, Iron.defaults)
  return sealed
}

export const decryptToken = async (token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const unsealed = await Iron.unseal(token, `${env.SECRET}`, Iron.defaults)
  return unsealed as string
}

export const validateJWT = async (cookieToken: string) => {
  const header = jwt.decode(cookieToken, { complete: true })?.header

  if (!header) {
    throw new Error('Invalid user / token')
  }

  const key = await getKey(header)

  const decoded = await new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(
      cookieToken,
      key.getPublicKey(),
      (err: unknown, decoded: unknown) =>
        err ? reject(err) : resolve(decoded as JwtPayload)
    )
  })

  if (!decoded.id || decoded.id === '') {
    throw new Error('Invalid user / token')
  }

  return decoded
}

export const validateCookie = async (encToken?: string) => {
  try {
    if (!encToken) {
      return null
    }

    const jwt = await decryptToken(encToken)
    const { id } = (await validateJWT(jwt)) as Record<string, string>

    return { id, jwt }
  } catch (err) {
    console.error(err)
    return null
    // throw new TRPCError({
    //   code: 'UNAUTHORIZED',
    //   message: 'An unexpected error occurred, please try again later.',
    //   cause: err,
    // })
  }
}

export const createCookie = (token: string) => {
  return cookie.serialize('token', token, {
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'strict',
  })
}
