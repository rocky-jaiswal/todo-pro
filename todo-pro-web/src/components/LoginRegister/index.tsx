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
        className="p-4"
        style={
          props.display.showLogin
            ? {
                color: 'black',
                opacity: 1,
                fontWeight: 'bold',
                textDecoration: 'underline',
              }
            : { color: 'blue' }
        }
      >
        Login
      </button>
      <span>|</span>
      <button
        disabled={!props.display.showLogin}
        className="p-4"
        onClick={() => props.setDisplay({ showLogin: false })}
        style={
          props.display.showLogin
            ? { color: 'blue' }
            : {
                color: 'black',
                opacity: 1,
                fontWeight: 'bold',
                textDecoration: 'underline',
              }
        }
      >
        Register
      </button>
    </div>
  )
}

export default LoginRegister
