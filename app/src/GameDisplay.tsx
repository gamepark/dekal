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
               css={process.env.NODE_ENV === 'development' && css`border: 0.1em solid white;`}>
      <GameTableNavigation css={navigationCss(players)}/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const sizes = [
  { xMin: -46, xMax: 46, yMin: 10, yMax: 57 },
  { xMin: -56, xMax: 56, yMin: -3, yMax: 54 },
  { xMin: -70, xMax: 70, yMin: -28, yMax: 48 },
  { xMin: -79, xMax: 79, yMin: -32, yMax: 52 },
  { xMin: -79, xMax: 79, yMin: -32, yMax: 52 },
]

const navigationCss = (players: number) => css`
  position: absolute; 
  left: 2em; 
  top: ${players <= 3? 10: 25}em;
`
