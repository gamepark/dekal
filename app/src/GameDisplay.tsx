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
      <GameTableNavigation css={navigationCss}/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const sizes = [
  { xMin: -45, xMax: 45, yMin: 5, yMax: 50 },
  { xMin: -55, xMax: 55, yMin: -3, yMax: 52 },
  { xMin: -70, xMax: 70, yMin: -28, yMax: 48 },
  { xMin: -79, xMax: 79, yMin: -32, yMax: 51 },
  { xMin: -79, xMax: 79, yMin: -32, yMax: 51 },
]

const navigationCss = css`
  position: absolute; 
  left: 2em; 
  top: 25em;
`
