import * as React from 'react'
import { type ReactElement } from 'react'
import type { GetServerSidePropsContext } from 'next'

import type { NextPageWithLayout } from './_app'
import { api } from '../utils/api'
import { validateCookie } from '../server/lib/token'

import { Loading } from '../components/Loading'
import { TaskList } from '../components/TaskList'

import LoggedInLayout from '../components/LoggedInLayout'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = await validateCookie(context.req.cookies['token'])

  if (userId?.id) {
    return { props: {} }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

const HomePage: NextPageWithLayout = () => {
  const homePageData = api.home.findUserAndLists.useQuery()

  return (
    <>
      {homePageData.isLoading ? (
        <Loading />
      ) : (
        <TaskList listData={homePageData.data} />
      )}
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout page={page} />
}

export default HomePage
