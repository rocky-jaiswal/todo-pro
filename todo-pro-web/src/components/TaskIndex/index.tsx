import * as React from 'react'

import { type Task as TaskType } from '../../server/types'
import { type TaskList as TaskListType } from '../../server/types'
import { CreateTask } from '../CreateTask'

interface Props {
  taskListData: TaskListType
  taskData?: TaskType[]
}

export const TaskIndex = (props: Props) => {
  return (
    <div>
      <div className="flex flex-row items-baseline">
        <h1 className="text-3xl font-bold py-5 text-blue-500">
          {props.taskListData?.name || ''}
        </h1>
        <p className="px-4">{props.taskListData?.description || ''}</p>
      </div>
      <div className="flex flex-col">
        {(props.taskData ?? []).map((task) => {
          return (
            <div
              key={task.id}
              className="flex flex-row border border-slate-400 p-2 my-2"
            >
              <div>{task.name}</div>
              <div>{task.description}</div>
            </div>
          )
        })}
      </div>
      <div className="my-8" />
      <h2 className="text-2xl text-sky-400">Create a todo</h2>
      <CreateTask listId={props.taskListData.id} />
      <div />
    </div>
  )
}
