import * as React from 'react'

import { type Task as TaskType } from '../../server/types'
import { type TaskList as TaskListType } from '../../server/types'
import { CreateTask } from '../CreateTask'
import { ListDisplay } from '../ListDisplay'
import { TasksDisplay } from '../TasksDisplay'

interface Props {
  taskListData: TaskListType
  taskData?: TaskType[]
  onTasksUpdate: () => unknown
  onListUpdate: () => unknown
  onListsUpdate: () => unknown
  setSelectedList: (listId: string | null) => unknown
}

export const TaskListWithTaskIndex = (props: Props) => {
  return (
    <div>
      <ListDisplay
        listId={props.taskListData.id}
        taskListData={props.taskListData}
        onListUpdate={props.onListUpdate}
        onListsUpdate={props.onListsUpdate}
        setSelectedList={props.setSelectedList}
      />
      <TasksDisplay
        taskData={props.taskData ?? []}
        onTasksUpdate={props.onTasksUpdate}
      />
      <div className="my-8" />
      <CreateTask
        listId={props.taskListData.id}
        onTasksUpdate={props.onTasksUpdate}
      />
      <div />
    </div>
  )
}
