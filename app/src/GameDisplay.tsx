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
  { xMin: -42, xMax: 40, yMin: 0, yMax: 52 },
  { xMin: -70, xMax: 70, yMin: -30, yMax: 52 },
  { xMin: -70, xMax: 70, yMin: -30, yMax: 50 },
]
