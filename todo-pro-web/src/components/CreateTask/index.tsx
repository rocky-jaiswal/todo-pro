import * as React from 'react'
import { useState } from 'react'

import { api } from '../../utils/api'

interface Props {
  listId: string
}

export const CreateTask = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dueBy, setDueDate] = useState<string | null>(null)

  const createTaskListMutation = api.task.createTask.useMutation()

  return (
    <div className="flex flex-col max-w-md">
      <form method="post">
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Name *:
          <input
            type="text"
            placeholder="Name"
            required={true}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Description:
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 py-2 my-2">
          Due By:
          <input
            type="date"
            placeholder="Due Date"
            onChange={(e) => setDueDate(e.currentTarget.value)}
          />
        </label>
        <button
          className="btn btn-primary p-2 my-4"
          type="submit"
          disabled={createTaskListMutation.isLoading}
          onClick={(e) => {
            e.preventDefault()
            createTaskListMutation.mutate({
              name,
              description,
              dueBy,
              listId: props.listId,
            })
          }}
        >
          Create Todo
        </button>
      </form>
    </div>
  )
}
