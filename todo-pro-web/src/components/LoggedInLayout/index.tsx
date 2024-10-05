import { type ReactElement } from 'react'

import NavBar from '../NavBar'
import TopBar from '../TopBar'

interface Props {
  page: ReactElement
}

function LoggedInLayout(props: Props) {
  return (
    <>
      <div className="flex min-h-screen flex-col text-slate-700">
        <TopBar />
        <div className="flex h-full w-full grow flex-col-reverse lg:flex-row">
          <NavBar />
          <main role="main" className="flex grow flex-col p-6">
            {props.page}
          </main>
        </div>
      </div>
    </>
  )
}

export default LoggedInLayout
