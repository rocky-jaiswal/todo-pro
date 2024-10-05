/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import { useRouter } from 'next/router'

import { api } from '../../utils/api'
import { useAsync } from '../../hooks/useAsync'

interface Props {
  display: boolean
}

function RegistrationForm(props: Props) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const createUserMutation = api.users.createUser.useMutation()

  const router = useRouter()

  useAsync(async () => {
    if (createUserMutation.isSuccess) {
      await router.push('/home')
    }
  })

  return (
    <div
      className="flex flex-col p-4 lg:w-2/3"
      style={props.display ? { display: 'flex' } : { display: 'none' }}
    >
      <form>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center">Email:</div>
          <input
            type="email"
            name="email"
            className="input-bordered input"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center">Password:</div>
          <input
            type="password"
            name="password"
            className="input-bordered input"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="mb-8 grid grid-cols-2 gap-2">
          <div className="flex items-center">Confirm password:</div>
          <input
            type="password"
            name="confirmPassword"
            className="input-bordered input"
            onChange={(e) => setConfirmedPassword(e.currentTarget.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-primary btn"
          disabled={createUserMutation.isLoading}
          onClick={(e) => {
            e.preventDefault()
            createUserMutation.mutate({
              email,
              password,
              confirmedPassword,
            })
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default RegistrationForm
