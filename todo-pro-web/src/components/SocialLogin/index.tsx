import { api } from '../../utils/api'

function SocialLogin() {
  const googleUrlQuery = api.sessions.getGoogleUrl.useQuery(undefined, {
    enabled: false,
  })

  const handleGoogleSignUp = async () => {
    const url = await googleUrlQuery.refetch()
    window.location.replace(url.data as string)
  }

  return (
    <div className="mt-6 flex flex-col p-4 lg:w-1/2">
      <button
        className="btn-info btn"
        onClick={(e) => {
          e.preventDefault()
          void handleGoogleSignUp()
        }}
      >
        Sign in with Google
      </button>
      <div className="h-10" />
    </div>
  )
}

export default SocialLogin
