import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Loading = (props: Props) => (
  <div className="loader loader--style8">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      width={50}
      height={50}
      style={{
        background: 'new 0 0 50 50',
      }}
      viewBox="0 0 50 50"
      {...props}
    >
      <path fill="#333" d="M0 10h4v10H0z" opacity={0.2}>
        <animate
          attributeName="opacity"
          attributeType="XML"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
          values="0.2; 1; .2"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 20; 10"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 5; 10"
        />
      </path>
      <path fill="#333" d="M8 10h4v10H8z" opacity={0.2}>
        <animate
          attributeName="opacity"
          attributeType="XML"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
          values="0.2; 1; .2"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 20; 10"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 5; 10"
        />
      </path>
      <path fill="#333" d="M16 10h4v10h-4z" opacity={0.2}>
        <animate
          attributeName="opacity"
          attributeType="XML"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
          values="0.2; 1; .2"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 20; 10"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
          values="10; 5; 10"
        />
      </path>
    </svg>
  </div>
)
