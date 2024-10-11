import * as React from 'react'
import { type ReactElement } from 'react'
import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import type { NextPageWithLayout } from '../_app'
import { api } from '../../utils/api'
import { validateCookie } from '../../server/lib/token'

import LoggedInLayout from '../../components/LoggedInLayout'
import { Loading } from '../../components/Loading'
import { TaskIndex } from '../../components/TaskIndex'

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

const TaskListIndex: NextPageWithLayout = () => {
  const router = useRouter()

  const taskListData = api.taskList.getListDetails.useQuery({
    id: router.query.id as string,
  })

  const taskData = api.taskList.getTasksForList.useQuery({
    id: router.query.id as string,
  })

  return (
    <>
      <Link className="text-blue-500 underline" href={`/home`}>
        ‹ Back
      </Link>
      {taskListData.isLoading || taskData.isLoading || !taskListData.data ? (
        <Loading />
      ) : (
        <TaskIndex taskListData={taskListData.data} taskData={taskData.data} />
      )}
    </>
  )
}

TaskListIndex.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout page={page} />
}

export default TaskListIndex
