import * as React from 'react'
import Image from 'next/image'

import {
  differenceInCalendarDays,
  endOfToday,
  isBefore,
  isToday,
} from 'date-fns'

import { type Task as TaskType } from '../../server/types'
import { api } from '../../utils/api'

interface Props {
  task: TaskType
  onTasksUpdate: () => unknown
}

const isOverdue = (dueBy: Date | null) =>
  dueBy && isBefore(dueBy, endOfToday()) && !isToday(dueBy)

const isDueToday = (dueBy: Date | null) => dueBy && isToday(dueBy)

const daysDiff = (dueBy: Date) => {
  const diff = Math.abs(differenceInCalendarDays(dueBy, endOfToday()))
  return diff === 1 ? `${diff} day` : `${diff} days`
}

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
              ${!task.completed && isOverdue(task.dueBy) ? 'bg-error' : ''} 
              ${!task.completed && isDueToday(task.dueBy) ? 'bg-warning' : ''}
              ${task.completed ? 'bg-[#769e6b]' : ''}
            `}
    >
      <div
        className={`flex items-center justify-between w-full px-2 ${task.completed ? 'line-through' : ''}`}
      >
        <div>{task.name}</div>
        <div
          className={
            task.dueBy && !task.completed ? 'text-sm italic' : 'hidden'
          }
        >
          {task.dueBy
            ? isOverdue(task.dueBy)
              ? `Overdue by ${daysDiff(task.dueBy)}`
              : isDueToday(task.dueBy)
                ? 'Due today'
                : `Due in ${daysDiff(task.dueBy)}`
            : ''}
        </div>
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
