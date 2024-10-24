import * as React from 'react'
import Image from 'next/image'

import { endOfToday, isBefore, isToday } from 'date-fns'

import { type Task as TaskType } from '../../server/types'
import { api } from '../../utils/api'

interface Props {
  task: TaskType
  onTasksUpdate: () => unknown
}

const isOverdue = (dueBy: Date | null) =>
  dueBy && isBefore(dueBy, endOfToday()) && !isToday(dueBy)
const isDueToday = (dueBy: Date | null) => dueBy && isToday(dueBy)

export const TaskCard = (props: Props) => {
  const deleteTaskMutation = api.task.deleteTask.useMutation()
  const markDoneMutation = api.task.markAsCompleted.useMutation()

  const { task } = props
  const taskRef = React.useRef<HTMLDetailsElement | null>(null)

  return (
    <div
      className={`flex flex-row justify-between 
              border border-secondary rounded-md 
              px-4 py-1 my-1 
              ${isOverdue(task.dueBy) ? 'bg-error' : ''} 
              ${isDueToday(task.dueBy) ? 'bg-warning' : ''}
              ${task.completed ? 'bg-[#769e6b]' : ''}
            `}
    >
      <div
        className={`flex items-center ${task.completed ? 'line-through' : ''}`}
      >
        {`${task.name} 
              ${isOverdue(task.dueBy) ? ' (Overdue)' : ''} 
              ${isDueToday(task.dueBy) ? ' (Due today)' : ''}`}
      </div>
      <div>
        <details className="dropdown dropdown-end" ref={taskRef}>
          <summary className="btn m-1">
            <Image src="/dots.png" width={20} height={20} alt="actions" />
          </summary>
          <ul className="menu dropdown-content bg-[#2f3389] rounded-box z-[1] w-52 p-2 shadow">
            <li style={task.completed ? { display: 'none' } : {}}>
              <button
                disabled={task.completed || markDoneMutation.isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  taskRef.current && taskRef.current.removeAttribute('open')
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
            {/* <li>
              <button>Edit</button>
            </li> */}
            <li>
              <button
                disabled={deleteTaskMutation.isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  taskRef.current && taskRef.current.removeAttribute('open')
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
}
