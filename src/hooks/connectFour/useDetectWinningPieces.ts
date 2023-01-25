import { ConnectSquare } from './../../types'
import { constants } from 'ethers'
import { useMemo } from 'react'
import { useStore } from './../../provider/store/StoreProvider'

type CheckFunc = (
  board: ConnectSquare[][],
  lastColumn: number,
  lastRow: number,
  winningTeamNum: number,
) => string[]

export function useDetectWinningPieces() {
  const {
    currentSeason: { currentGame },
  } = useStore()

  const checkHorizontalWin: CheckFunc = (board, lastRow, lastColumn, winningTeamNum) => {
    const lastPieceLocation = `${lastRow}:${lastColumn}`
    const connectedPieces = [lastPieceLocation]

    // to the right
    for (let i = lastColumn + 1; i < 6; i++) {
      const square = board[lastRow][i]
      if (square.team === winningTeamNum) {
        connectedPieces.push(square.location)
      }
    }
    // to the left
    if (lastColumn !== 0) {
      let columnIndex = lastColumn - 1
      while (columnIndex >= 0) {
        const square = board[lastRow][columnIndex]
        if (square.team === winningTeamNum) {
          connectedPieces.push(square.location)
        }
        columnIndex--
      }
    }
    return connectedPieces
  }

  const checkVerticalWin: CheckFunc = (board, lastRow, lastColumn, winningTeamNum) => {
    const lastPieceLocation = `${lastRow}:${lastColumn}`
    const connectedPieces = [lastPieceLocation]

    // to the right
    for (let i = lastRow + 1; i < 6; i++) {
      const square = board[i][lastColumn]
      if (square.team === winningTeamNum) {
        connectedPieces.push(square.location)
      }
    }
    // to the left
    if (lastRow !== 0) {
      let rowIndex = lastRow - 1
      while (rowIndex >= 0) {
        const square = board[rowIndex][lastColumn]
        if (square.team === winningTeamNum) {
          connectedPieces.push(square.location)
        }
        rowIndex--
      }
    }
    return connectedPieces
  }

  const checkForwardAngleWin: CheckFunc = (board, lastRow, lastColumn, winningTeamNum) => {
    const lastPieceLocation = `${lastRow}:${lastColumn}`
    const connectedPieces = [lastPieceLocation]

    // to the right
    for (let i = lastRow + 1; i < 6 - lastRow; i++) {
      const square = board[i][i]
      if (square.team === winningTeamNum) {
        connectedPieces.push(square.location)
      }
    }
    // to the left
    if (lastRow !== 0 && lastColumn !== 0) {
      let rowIndex = lastRow - 1
      let columnIndex = lastColumn - 1
      while (rowIndex >= 0 && columnIndex >= 0) {
        const square = board[rowIndex][columnIndex]
        if (square.team === winningTeamNum) {
          connectedPieces.push(square.location)
        }
        rowIndex--
        columnIndex--
      }
    }
    return connectedPieces
  }
  const checkBackwardAngleWin: CheckFunc = (board, lastRow, lastColumn, winningTeamNum) => {
    const lastPieceLocation = `${lastRow}:${lastColumn}`
    const connectedPieces = [lastPieceLocation]

    // to the left
    if (lastRow !== 0) {
      let rowIndex = lastRow - 1
      let columnIndex = lastColumn + 1
      while (rowIndex >= 0 && columnIndex < 6) {
        const square = board[rowIndex][columnIndex]
        if (square.team === winningTeamNum) {
          connectedPieces.push(square.location)
        }
        rowIndex--
        columnIndex--
      }
    }
    // to the left
    if (lastRow !== 0 && lastColumn !== 0) {
      let rowIndex = lastRow + 1
      let columnIndex = lastColumn - 1
      while (rowIndex < 6 && columnIndex >= 0) {
        const square = board[rowIndex][columnIndex]
        if (square.team === winningTeamNum) {
          connectedPieces.push(square.location)
        }
        rowIndex++
        columnIndex--
      }
    }
    return connectedPieces
  }

  const connectedPieces = useMemo(() => {
    if (!currentGame) {
      return []
    }
    const { winner, board, teamOne, lastTurnData } = currentGame

    if (winner === constants.AddressZero || !lastTurnData) {
      return []
    }

    const { lastRow, lastColumn } = lastTurnData
    const isTeamOneWinner = winner === teamOne.full

    const winningTeamNum = isTeamOneWinner ? 1 : 2

    // matches logic in the contracts, so that same patterns can be repeated.
    const reverseBoard = [...board].reverse()

    const connectedPieces = [
      checkHorizontalWin(reverseBoard, lastRow, lastColumn, winningTeamNum),
      checkVerticalWin(reverseBoard, lastRow, lastColumn, winningTeamNum),
      checkForwardAngleWin(reverseBoard, lastRow, lastColumn, winningTeamNum),
      checkBackwardAngleWin(reverseBoard, lastRow, lastColumn, winningTeamNum),
    ].filter((connectedPieces: string[]) => {
      return connectedPieces.length >= 4
    })
    // check veritical win

    // check forward angle win

    // check backward angle win
    if (connectedPieces.length) {
      return connectedPieces[0]
    }
    return []
  }, [currentGame])
  return { connectedPieces }
}
