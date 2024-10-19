import * as React from 'react'
import { useState } from 'react'

import { api } from '../../utils/api'

interface Props {
  displayCreateListForm: boolean
  onListsUpdate: () => unknown
  setSelectedList: (listId: string) => unknown
  // setCreateListFormDisplay: (_: boolean) => unknown
}

export const CreateTaskList = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const createTaskListMutation = api.taskList.createTaskList.useMutation()

  if (!props.displayCreateListForm) {
    return <div />
  }

  return (
    <div className="flex flex-col max-w-96 my-6">
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
        <button
          className="btn btn-primary p-2 my-4"
          type="submit"
          disabled={createTaskListMutation.isLoading}
          onClick={(e) => {
            e.preventDefault()
            createTaskListMutation
              .mutateAsync({
                name,
                description,
              })
              .then((response: { id: string }) => {
                // props.setCreateListFormDisplay(false)
                props.onListsUpdate()
                props.setSelectedList(response.id)
              })
              .catch((err) => console.error(err)) // TODO: Handle this error
          }}
        >
          Create List
        </button>
      </form>
    </div>
  )
}
