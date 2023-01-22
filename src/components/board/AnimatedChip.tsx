import { Box, keyframes, forwardRef } from '@chakra-ui/react';
import { TEAM_COLORS } from '../../constants';
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

  if (square.team && isOutOfBounds) {
    return (
      <Box
        ref={ref}
        w='full'
        h='full'
        rounded='full'
        animation={isOutOfBounds ? animationDownTraveling : undefined}
        sx={{ ...TEAM_COLORS[square.team - 1] }}
        boxSize={24}
        position='absolute'
        left={10}
        right={10}
        opacity='0'
        transform='translateY(-150%)'
      />
    )
  }
  return null
})