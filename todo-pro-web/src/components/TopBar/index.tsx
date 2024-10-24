import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAsync } from '../../hooks/useAsync'

import { api } from '../../utils/api'

function TopBar() {
  const userDetails = api.users.userDetails.useQuery()

  const router = useRouter()
  const [isLoggedOut, setLoggedOut] = useState(false)

  useAsync(async () => {
    if (isLoggedOut) {
      await router.push('/logout')
    }
  })

  return (
    <div className="flex w-full justify-between navbar">
      <div className="p-4">
        <h1 className="text-3xl font-bold">To-do Pro</h1>
      </div>
      <div className="p-4">
        <div>
          <p className="text-sm font-bold mx-2">
            Welcome, {userDetails.isSuccess ? userDetails.data?.email : 'user'}
          </p>
        </div>
        <button
          className="btn-secondary btn bg-info"
          onClick={() => {
            setLoggedOut(true)
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default TopBar
