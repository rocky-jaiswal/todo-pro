import * as React from 'react'

import { type TaskList as TaskListType } from '../../server/types'
import { CreateTaskList } from '../CreateTaskList'
import { TaskListIndex } from '../TaskListIndex'

interface Props {
  listData?: TaskListType[]
}

export const TaskList = (props: Props) => {
  if (!props.listData || props.listData?.length === 0) {
    return (
      <>
        <p>You have no lists created. Why not create one now?</p>
        <CreateTaskList />
      </>
    )
  }

  return (
    <>
      <TaskListIndex listData={props.listData} />
      <div className="flex flex-col my-10">
        <h2 className="text-2xl text-sky-400">Create a list</h2>
        <CreateTaskList />
      </div>
    </>
  )
}
