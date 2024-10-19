import * as React from 'react'
import Image from 'next/image'
import { isAfter, isSameDay } from 'date-fns'

import { type Task as TaskType } from '../../server/types'
import { api } from '../../utils/api'

interface Props {
  taskData: TaskType[]
  onTasksUpdate: () => unknown
}

export const TasksDisplay = (props: Props) => {
  const deleteTaskMutation = api.task.deleteTask.useMutation()
  const markDoneMutation = api.task.markAsCompleted.useMutation()

  return (
    <div className="flex flex-col">
      {props.taskData.map((task) => {
        return (
          <div
            key={task.id}
            className={`flex flex-row justify-between 
              border border-secondary rounded-md 
              px-4 py-2 my-2 
              ${task.dueBy && isAfter(new Date(), task.dueBy) ? 'bg-error' : ''} 
              ${task.dueBy && isSameDay(new Date(), task.dueBy) ? 'bg-warning' : ''}
              ${task.completed ? 'bg-[#769e6b]' : ''}
            `}
          >
            <div
              className={`flex items-center ${task.completed ? 'line-through' : ''} `}
            >
              {task.name}
            </div>
            <div>
              <details className="dropdown dropdown-end">
                <summary className="btn m-1">
                  <Image src="/dots.png" width={20} height={20} alt="actions" />
                </summary>
                <ul className="menu dropdown-content bg-[#2f3389] rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <button
                      disabled={markDoneMutation.isLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        markDoneMutation
                          .mutateAsync({
                            id: task.id,
                          })
                          .then(() => props.onTasksUpdate())
                          .catch((err) => console.error(err)) // TODO: Handle this error
                      }}
                    >
                      Mark done
                    </button>
                  </li>
                  <li>
                    <button>Edit</button>
                  </li>
                  <li>
                    <button
                      disabled={deleteTaskMutation.isLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        deleteTaskMutation
                          .mutateAsync({
                            id: task.id,
                          })
                          .then(() => props.onTasksUpdate())
                          .catch((err) => console.error(err)) // TODO: Handle this error
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        )
      })}
    </div>
  )
}
