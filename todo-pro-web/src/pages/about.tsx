import { type NextPage } from 'next'
import Link from 'next/link'

import AppHeader from '../components/AppHeader'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-start min-h-screen">
      <AppHeader />
      <main className="flex flex-col lg:flex-row max-w-7xl min-h-[800px]">
        <div className="flex flex-col p-6">
          <p>
            This site uses cookies to save your user sessions. No data is shared
            with anyone. All code is open source and available for review.
          </p>
          <p>
            All code is on{' '}
            <a
              href="https://github.com/rocky-jaiswal/todo-pro"
              target="_blank"
              rel="noreferrer"
              className={'text-primary underline'}
            >
              Github
            </a>
          </p>
          <p>For any issues / feedback please raise a Github issue.</p>
          <p>
            <Link href={'/'} className="py-4 text-blue-500 underline">
              Back
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Home
