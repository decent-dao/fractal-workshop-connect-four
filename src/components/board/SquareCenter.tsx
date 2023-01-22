import { useCallback, useEffect, useRef } from 'react'
import { ConnectSquare } from '../../types'
import { Box } from '@chakra-ui/react'
import { TEAM_COLORS } from '../../constants'
import { useConnectFourGame } from '../../provider/store/hooks/useConnectFourGame'
import { useStore } from '../../provider/store/StoreProvider'
import { SeasonAction } from '../../provider/store/season/actions'

export function SquareCenter({
  square,
  animatedChipRef,
}: {
  square: ConnectSquare
  animatedChipRef: React.RefObject<HTMLDivElement>
}) {
  const locationRef = useRef<HTMLDivElement>(null)
  const isOutOfBounds = square.location.includes('x')

  const { getBoardData } = useConnectFourGame({})
  const { currentSeason: { currentGame }, dispatch } = useStore()

  const updateBoard = useCallback(async () => {
    if (!currentGame) {
      return;
    }
    const board = await getBoardData(currentGame.gameId);
    if(!board) {
      // @todo if this for some reason fails, would need to refresh. possibly add a retry here.
      return;
    }
    dispatch({
      type: SeasonAction.UPDATE_MOVE_FINISHED,
      payload: { board }
    })
  }, [currentGame, dispatch, getBoardData])

  useEffect(() => {
    const fallingPieceEle = animatedChipRef.current
    const locationEle = locationRef.current
    let intervalId: NodeJS.Timer
    const animationEndListener = () => {
      updateBoard();
      clearInterval(intervalId)
    }
    if (fallingPieceEle && locationEle && !isOutOfBounds) {
      fallingPieceEle.addEventListener('animationstart', () => {
        intervalId = setInterval(() => {
          const fallingRect = fallingPieceEle.getBoundingClientRect()
          const locationRect = locationEle.getBoundingClientRect()
          const fallingRectbottom = Math.round(fallingRect.bottom)
          const lrt = locationRect.top
          const lrb = locationRect.top + 96
          if (square.team) {
            if ((fallingRectbottom >= lrt && fallingRectbottom <= lrb) || fallingRectbottom === 0) {
              const animations = animatedChipRef.current?.getAnimations()
              if(animations) {
                animations[0].cancel()
              }
              clearInterval(intervalId)
            }
            return
          }
        }, 1)
        fallingPieceEle.addEventListener('animationcancel', animationEndListener)
      })
      return () => {
        fallingPieceEle.removeEventListener('animationcancel', animationEndListener)
      }
    }
  }, [animatedChipRef, square, isOutOfBounds, updateBoard])
  return (
    <Box ref={locationRef}>
      {square.team && !isOutOfBounds && (
        <Box
          boxSize={24}
          rounded='full'
          {...TEAM_COLORS[square.team - 1]}
        />
      )}
    </Box>
  )
}
