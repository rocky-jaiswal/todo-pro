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
    <div className="navbar flex justify-between bg-blue-400">
      <div className="py-4 px-6">
        <h1 className="text-3xl font-bold text-base-100">Todo Pro</h1>
      </div>
      <div className="p-4">
        <div>
          <p className="text-sm font-bold text-base-100 mx-2">
            Welcome, {userDetails.isSuccess ? userDetails.data?.email : 'user'}
          </p>
        </div>
        <button
          className="btn-secondary btn bg-orange-200"
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
