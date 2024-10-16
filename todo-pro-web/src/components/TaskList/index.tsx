import * as React from 'react'
import { useState } from 'react'

import { type TaskList as TaskListType } from '../../server/types'
import { CreateTaskList } from '../CreateTaskList'
import { TaskListIndex } from '../TaskListIndex'

interface Props {
  listData?: TaskListType[]
}

export const TaskList = (props: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)

  if (!props.listData || props.listData?.length === 0) {
    return (
      <>
        <p>You have no lists created. Why not create one now?</p>
        <CreateTaskList displayCreateListForm={true} />
      </>
    )
  }

  return (
    <div className="flex flex-col justify-between	min-w-full">
      <div className="flex flex-row justify-between	">
        <TaskListIndex listData={props.listData} />
        <button
          className="btn btn-primary"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? 'Cancel' : 'Add List'}
        </button>
      </div>
      <CreateTaskList displayCreateListForm={displayForm} />
    </div>
  )
}
