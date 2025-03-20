/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import { DekalPlayerPanel } from './DekalPlayerPanel'

export const PlayerPanels = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }



  return createPortal(
    <>
      {players.map((player, index) =>
        <DekalPlayerPanel
          key={player.id}
          player={player}
          css={[panelPosition, positionCss[players.length - 2][index]]}
        />
      )}
    </>,
    root
  )
}
const panelPosition = css`
  position: absolute;
  width: 23em;
  font-size: 0.9em;
`

const topLeft = css`
  left: 1.5em;
  top: 10em;
`

const topRight = css`
  right: 1.5em;
  top: 10em;
`

const bottomLeft = css`
  left: 1.5em;
  bottom: 1.5em;
`

const bottomRight = css`
    right: 1.5em;
    bottom: 1.5em;
`

const topCenter = (players: number) => css`
    left: ${players === 6? 65: 59}em;
    top: 10em;
`

const bottomCenter = (players: number) => css`
  left: ${players === 3? 75: 65}em;
  bottom: 1.5em;
`


const positionCss = [
  [bottomLeft, bottomRight], // 2 players
  [bottomLeft, bottomCenter(3), bottomRight], // 3 players
  [bottomLeft, topLeft, topRight, bottomRight], // 4 players
  [bottomLeft, topLeft, topCenter(5), topRight, bottomRight], // 5 players
  [bottomLeft, topLeft, topCenter(6), topRight, bottomRight, bottomCenter(6)], // 6 players
]
