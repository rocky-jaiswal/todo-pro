import * as React from 'react'
import { useState } from 'react'

import { type Task as TaskType } from '../../server/types'
import { api } from '../../utils/api'
import { format } from 'date-fns'

interface Props {
  task: TaskType
  onTasksUpdate: () => unknown
  setDisplayEditForm: (display: boolean) => unknown
}

export const EditTask = (props: Props) => {
  const [name, setName] = useState<string>(props.task.name)
  const [dueBy, setDueDate] = useState<string | null>(
    props.task.dueBy ? format(props.task.dueBy, 'yyyy-MM-dd') : null
  )

  const updateTaskMutation = api.task.updateTask.useMutation()

  return (
    <div className="flex flex-col items-end">
      <form method="post">
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Name:
          <input
            type="text"
            placeholder="Name"
            required={true}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Due By:
          <input
            type="date"
            placeholder="Due Date"
            value={dueBy || ''}
            onChange={(e) => setDueDate(e.currentTarget.value)}
          />
        </label>
        <div className="flex justify-end p-2 my-4">
          <button
            className="btn btn-success"
            type="submit"
            disabled={!name || updateTaskMutation.isLoading}
            onClick={(e) => {
              e.preventDefault()
              props.setDisplayEditForm(false)
              updateTaskMutation
                .mutateAsync({
                  id: props.task.id,
                  name,
                  description: null,
                  dueBy,
                })
                .then(() => {
                  props.onTasksUpdate()
                })
                .catch((err) => console.error(err)) // TODO: Handle this error
            }}
          >
            {updateTaskMutation.isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'Update Todo'
            )}
          </button>
          <button
            className="btn btn-outline btn-ghost ml-4"
            onClick={() => props.setDisplayEditForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
