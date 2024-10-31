import * as React from 'react'
import { useState } from 'react'

import { api } from '../../utils/api'

interface Props {
  listId: string
  listName: string
  listDescription: string
  onListUpdate: () => unknown
  onListsUpdate: () => unknown
  setEditListFormDisplay: (display: boolean) => unknown
}

export const EditTaskList = (props: Props) => {
  const [name, setName] = useState<string>(props.listName)
  const [description, setDescription] = useState<string>(props.listDescription)
  const editTaskListMutation = api.taskList.editList.useMutation()

  return (
    <div className="flex flex-col max-w-96 my-6">
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
          Description:
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </label>
        <button
          className="btn btn-primary p-2 my-4"
          type="submit"
          disabled={!name}
          onClick={(e) => {
            e.preventDefault()
            props.setEditListFormDisplay(false)
            editTaskListMutation
              .mutateAsync({
                listId: props.listId,
                name,
                description,
              })
              .then(() => {
                props.onListUpdate()
                props.onListsUpdate()
              })
              .catch((err) => console.error(err)) // TODO: Handle this error
          }}
        >
          Update List
        </button>
        <button
          className="btn btn-outline btn-ghost mx-4"
          onClick={() => {
            props.setEditListFormDisplay(false)
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}
