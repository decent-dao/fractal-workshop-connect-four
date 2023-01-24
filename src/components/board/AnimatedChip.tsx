import { keyframes, forwardRef } from '@chakra-ui/react';
import { TEAM } from '../../constants';
import { ConnectSquare } from '../../types'

const animateDownTraveling = keyframes`
0%   { opacity: 100% }
100% { opacity: 100%;  transform: translateY(700%) }
`
const animationDownTraveling = `${animateDownTraveling} 6s 1`

interface IAnimatedChip {
  square: ConnectSquare;
}

export const AnimatedChip = forwardRef<IAnimatedChip, 'div'>(({ square }, ref) => {
  const isOutOfBounds = square.location.includes('x')

  const CoinIcon = square.team ? TEAM[square.team - 1].CoinIcon : undefined;
  if (CoinIcon && isOutOfBounds) {
    return (
      <CoinIcon
        ref={ref}
        animation={isOutOfBounds ? animationDownTraveling : undefined}
        boxSize={28}
        position='absolute'
        left={8}
        opacity='0'
        transform='translateY(-150%)'
      />
    )
  }
  return null
})