import * as React from 'react'
import { useState } from 'react'

import { api } from '../../utils/api'

interface Props {
  listId: string
  onTasksUpdate: () => unknown
}

export const CreateTask = (props: Props) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [dueBy, setDueDate] = useState<string | null>(null)

  const createTaskListMutation = api.task.createTask.useMutation()

  if (!displayForm) {
    return (
      <div className="flex flex-col items-end">
        <button
          className="btn btn-success"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? 'Cancel' : 'Add Todo'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end">
      <form method="post">
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Name *:
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
        <div className="flex justify-end">
          <button
            className="btn btn-success p-2 my-4"
            type="submit"
            disabled={!name || createTaskListMutation.isLoading}
            onClick={(e) => {
              e.preventDefault()
              createTaskListMutation
                .mutateAsync({
                  name,
                  description: null,
                  dueBy,
                  listId: props.listId,
                })
                .then(() => {
                  setName('')
                  setDueDate(null)
                  props.onTasksUpdate()
                })
                .catch((err) => console.error(err)) // TODO: Handle this error
            }}
          >
            {createTaskListMutation.isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              'Add Todo'
            )}
          </button>
        </div>
      </form>
      <button
        className="btn btn-outline btn-ghost"
        onClick={() => setDisplayForm(false)}
      >
        Cancel
      </button>
    </div>
  )
}
