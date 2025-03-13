/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({players}) => {
  return <>
    <GameTable
      verticalCenter
      {...sizes[players - 2]}
               margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
               css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const sizes = [
  { xMin: -40, xMax: 40, yMin: 0, yMax: 50 },
  { xMin: -50, xMax: 50, yMin: -30, yMax: 30 },
  { xMin: -50, xMax: 50, yMin: -30, yMax: 30 },
  { xMin: -50, xMax: 50, yMin: -50, yMax: 50 },
]
