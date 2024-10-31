import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Loading = (_props: Props) => (
  <div className="flex flex-col justify-center items-center w-full p-6">
    <span className="loading loading-spinner text-primary"></span>
  </div>
)
