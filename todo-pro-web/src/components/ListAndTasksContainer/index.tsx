/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { useState } from 'react'

import { type TaskList as TaskListType } from '../../server/types'
import { type Task as TaskType } from '../../server/types'

import { TaskListWithTaskIndex } from '../TaskListWithTaskIndex'
import { CreateTaskList } from '../CreateTaskList'
import { TaskListIndex } from '../TaskListIndex'

interface Props {
  listData: TaskListType[]
  taskListData: TaskListType
  selectedList: string
  taskData: TaskType[]

  onListsUpdate: () => unknown
  onListUpdate: () => unknown
  onTasksUpdate: () => unknown
  setSelectedList: (id: string | null) => unknown
}

export const ListAndTasksContainer = (props: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)

  return (
    <div className="flex flex-col justify-between	min-w-full">
      <div className="flex flex-row justify-between">
        <TaskListIndex
          listData={props.listData}
          selectedList={props.selectedList}
          setSelectedList={props.setSelectedList}
        />
        <button
          className="btn btn-primary"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? 'Cancel' : 'Add List'}
        </button>
      </div>
      <CreateTaskList
        displayCreateListForm={displayForm}
        onListsUpdate={props.onListsUpdate}
        setSelectedList={props.setSelectedList}
      />
      <TaskListWithTaskIndex
        taskListData={props.taskListData}
        taskData={props.taskData}
        onListsUpdate={props.onListsUpdate}
        onListUpdate={props.onListUpdate}
        onTasksUpdate={props.onTasksUpdate}
        setSelectedList={props.setSelectedList}
      />
    </div>
  )
}
