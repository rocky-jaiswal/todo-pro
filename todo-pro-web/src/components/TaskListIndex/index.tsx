import * as React from 'react'

import { type TaskList as TaskListType } from '../../server/types'

interface Props {
  listData: TaskListType[]
}

export const TaskListIndex = (props: Props) => {
  return (
    <div className="flex flex-row lg:w-10/12 w-56 overflow-x-auto">
      {props.listData.map((list) => {
        return (
          <div key={list.id}>
            <div>
              <button className="btn btn-outline btn-secondary mr-2">
                {list.name}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
