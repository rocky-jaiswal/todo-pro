import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'

import { api } from '../utils/api'
import { useAsync } from '../hooks/useAsync'
import { useEffect } from 'react'

export function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const code: string = context.query.code as string

    if (!code || code === '') {
      throw new Error('bad Google code!')
    }

    return {
      props: {
        code,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

interface Props {
  code?: string
}

const GoogleCallbackPage: NextPage = (props: Props) => {
  const router = useRouter()

  const googleUser = api.users.createGoogleUser.useMutation()

  useEffect(() => {
    if (props.code) {
      googleUser.mutate({ code: props.code })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code])

  useAsync(async () => {
    if (googleUser.isSuccess) {
      await router.push('/home')
    }
  })

  return (
    <>
      <div className="flex w-full">
        <p>Loading user...</p>
      </div>
    </>
  )
}

export default GoogleCallbackPage
