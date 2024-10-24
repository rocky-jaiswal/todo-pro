import * as React from 'react'
import Image from 'next/image'
import { endOfToday, isBefore, isToday } from 'date-fns'

import { type Task as TaskType } from '../../server/types'
import { api } from '../../utils/api'

interface Props {
  taskData: TaskType[]
  onTasksUpdate: () => unknown
}

const isOverdue = (dueBy: Date | null) =>
  dueBy && isBefore(dueBy, endOfToday()) && !isToday(dueBy)
const isDueToday = (dueBy: Date | null) => dueBy && isToday(dueBy)

export const TasksDisplay = (props: Props) => {
  const deleteTaskMutation = api.task.deleteTask.useMutation()
  const markDoneMutation = api.task.markAsCompleted.useMutation()

  const myRefs = React.useRef<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  myRefs.current = props.taskData.map(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (_, i) => myRefs.current[i] ?? React.createRef()
  )

  return (
    <div className="flex flex-col">
      {props.taskData.map((task, idx) => {
        return (
          <div
            key={task.id}
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
              <details
                className="dropdown dropdown-end"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                ref={myRefs.current[idx]}
              >
                <summary className="btn m-1">
                  <Image src="/dots.png" width={20} height={20} alt="actions" />
                </summary>
                <ul className="menu dropdown-content bg-[#2f3389] rounded-box z-[1] w-52 p-2 shadow">
                  <li style={task.completed ? { display: 'none' } : {}}>
                    <button
                      disabled={task.completed || markDoneMutation.isLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        myRefs.current[idx] &&
                          myRefs.current[idx].current &&
                          myRefs.current[idx].current.removeAttribute('open')
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
                        myRefs.current[idx] &&
                          myRefs.current[idx].current &&
                          myRefs.current[idx].current.removeAttribute('open')
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
