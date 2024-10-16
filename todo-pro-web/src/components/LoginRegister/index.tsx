interface Props {
  display: {
    showLogin: boolean
  }
  setDisplay: (arg: { showLogin: boolean }) => void
}

function LoginRegister(props: Props) {
  return (
    <div className="mb-8">
      <button
        disabled={props.display.showLogin}
        onClick={() => props.setDisplay({ showLogin: true })}
        className={`p-4 btn-link ${props.display.showLogin ? 'text-success' : 'text-base'}`}
      >
        Login
      </button>
      <span>|</span>
      <button
        disabled={!props.display.showLogin}
        className={`p-4 btn-link ${!props.display.showLogin ? 'text-success' : 'text-base'}`}
        onClick={() => props.setDisplay({ showLogin: false })}
      >
        Register
      </button>
    </div>
  )
}

export default LoginRegister
