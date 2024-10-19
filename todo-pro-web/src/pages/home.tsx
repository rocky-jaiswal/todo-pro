/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { type ReactElement, useState } from 'react'
import type { GetServerSidePropsContext } from 'next'

import type { NextPageWithLayout } from './_app'
import { api } from '../utils/api'
import { validateCookie } from '../server/lib/token'

import { Loading } from '../components/Loading'
import { ListAndTasksContainer } from '../components/ListAndTasksContainer'
import { CreateTaskList } from '../components/CreateTaskList'

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
  const [selectedList, setSelectedList] = useState<string | null>(null)

  const taskListQuery = api.home.findUserAndLists.useQuery()

  if (!selectedList && taskListQuery.data) {
    // console.log(selectedList)
    setSelectedList(taskListQuery.data[0]?.id ?? null)
  }

  const taskListDataQuery = api.taskList.getListDetails.useQuery(
    {
      id: selectedList!,
    },
    { enabled: selectedList !== null }
  )

  const taskDataQuery = api.taskList.getTasksForList.useQuery(
    {
      id: selectedList!,
    },
    { enabled: selectedList !== null }
  )

  if (
    taskListDataQuery.isLoading ||
    taskListQuery.isLoading ||
    !taskListQuery.data ||
    taskDataQuery.isLoading ||
    !taskListDataQuery.data ||
    !taskDataQuery.data
  ) {
    return <Loading />
  }

  if (taskListQuery.data.length === 0) {
    return (
      <>
        <p>You have no lists created. Why not create one now?</p>
        <CreateTaskList
          displayCreateListForm={true}
          onListsUpdate={taskListQuery.refetch}
          setSelectedList={setSelectedList}
        />
      </>
    )
  }

  return (
    <ListAndTasksContainer
      listData={taskListQuery.data}
      taskListData={taskListDataQuery.data}
      selectedList={selectedList!}
      taskData={taskDataQuery.data}
      onListsUpdate={taskListQuery.refetch}
      onListUpdate={taskListDataQuery.refetch}
      onTasksUpdate={taskDataQuery.refetch}
      setSelectedList={setSelectedList}
    />
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout page={page} />
}

export default HomePage
