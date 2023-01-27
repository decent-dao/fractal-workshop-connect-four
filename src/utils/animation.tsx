import { keyframes } from '@emotion/react'

export const rotateCoin = keyframes`
0% { transform: rotateY(0deg)}
50% { transform: rotateY(90deg)}
100% { transform: rotateY(0deg)}
`

export const rotateAnimation = `${rotateCoin} ease-out 2s infinite`