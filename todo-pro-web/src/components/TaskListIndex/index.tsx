import * as React from 'react'

import { type TaskList as TaskListType } from '../../server/types'

interface Props {
  listData: TaskListType[]
  selectedList: string
  setSelectedList: (listId: string) => void
}

export const TaskListIndex = (props: Props) => {
  return (
    <div className="flex flex-row lg:w-10/12 w-56 overflow-x-auto">
      {props.listData.map((list) => {
        return (
          <div key={list.id}>
            <button
              className={`btn ${props.selectedList === list.id ? 'btn-accent' : 'btn-outline btn-secondary'} mr-2`}
              onClick={() => props.setSelectedList(list.id)}
            >
              {list.name}
            </button>
          </div>
        )
      })}
    </div>
  )
}
