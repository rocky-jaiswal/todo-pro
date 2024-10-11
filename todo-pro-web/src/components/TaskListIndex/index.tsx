import * as React from 'react'
import Link from 'next/link'

import { type TaskList as TaskListType } from '../../server/types'

interface Props {
  listData: TaskListType[]
}

export const TaskListIndex = (props: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-sky-400">Your Task lists</h2>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.listData.map((list) => {
            return (
              <tr key={list.id}>
                <td>{list.name}</td>
                <td>{list.description}</td>
                <td>
                  <Link
                    className="text-blue-500 underline"
                    href={`/task-lists/${list.id}`}
                  >
                    Go ›
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
