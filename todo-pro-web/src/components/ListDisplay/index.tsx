import * as React from 'react'
import Image from 'next/image'

import { type TaskList as TaskListType } from '../../server/types'
import { api } from '../../utils/api'

interface Props {
  taskListData: TaskListType
  onListUpdate: () => unknown
  onListsUpdate: () => unknown
  setSelectedList: (listId: string | null) => unknown
}

export const ListDisplay = (props: Props) => {
  const deleteListMutation = api.taskList.deleteList.useMutation()
  const detailsRef = React.useRef<HTMLDetailsElement | null>(null)

  return (
    <div className="flex flex-row justify-between items-baseline border rounded-md p-4 my-4">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-bold py-5 text-blue-500">
          {props.taskListData.name || ''}
        </h1>
        <p className="badge badge-ghost px-4">
          {props.taskListData.description || ''}
        </p>
      </div>
      <div>
        <details className="dropdown dropdown-end" ref={detailsRef}>
          <summary className="btn m-1">
            <Image src="/dots.png" width={20} height={20} alt="actions" />
          </summary>
          <ul className="menu dropdown-content bg-[#2f3389] rounded-box z-[1] w-52 p-2 shadow">
            {/* <li>
              <button>Edit</button>
            </li> */}
            <li>
              <button
                disabled={deleteListMutation.isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  detailsRef.current &&
                    detailsRef.current.removeAttribute('open')
                  deleteListMutation
                    .mutateAsync({
                      listId: props.taskListData.id,
                    })
                    .then(() => {
                      props.onListsUpdate()
                      props.setSelectedList(null)
                    })
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
