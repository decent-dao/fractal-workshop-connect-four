import { useCallback, useEffect, useRef } from 'react'
import { ConnectSquare } from '../../types'
import { Box } from '@chakra-ui/react'
import { CHIP_COLORS } from '../../constants'
import { useConnectFourGame } from '../../provider/store/hooks/useConnectFourGame'
import { useStore } from '../../provider/store/StoreProvider'
import { SeasonAction } from '../../provider/store/season/actions'

export function SquareCenter({
  square,
  fallingChipRef,
}: {
  square: ConnectSquare
  fallingChipRef: React.RefObject<HTMLDivElement>
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
    const fallingPieceEle = fallingChipRef.current
    const locationEle = locationRef.current
    let intervalId: NodeJS.Timer
    const animationEndListener = () => {
      updateBoard();
      clearInterval(intervalId)
    }
    // @todo add animation boolean? remove ref?
    if (fallingPieceEle && locationEle && !isOutOfBounds) {
      fallingPieceEle.addEventListener('animationstart', () => {
        intervalId = setInterval(() => {
          const fallingRect = fallingPieceEle.getBoundingClientRect()
          const locationRect = locationEle.getBoundingClientRect()
          const fallingRectbottom = Math.round(fallingRect.bottom)
          const lrt = locationRect.top
          const lrb = locationRect.top + 96
          if (square.team) {
            if (fallingRectbottom >= lrt && fallingRectbottom <= lrb) {
              const animations = fallingChipRef.current?.getAnimations()
              if(animations) {
                const hopefullyThisAnimation = animations[0];
                hopefullyThisAnimation.cancel()
              }
              clearInterval(intervalId)
            }
            return
          }
          clearInterval(intervalId)
        }, 1)
        fallingPieceEle.addEventListener('animationcancel', animationEndListener)
      })
      return () => {
        fallingPieceEle.removeEventListener('animationcancel', animationEndListener)
      }
    }
  }, [fallingChipRef, square, isOutOfBounds, updateBoard])
  return (
    <Box ref={locationRef}>
      {square.team && !isOutOfBounds && (
        <Box
          boxSize={24}
          rounded='full'
          {...CHIP_COLORS[square.team - 1]}
        />
      )}
    </Box>
  )
}
