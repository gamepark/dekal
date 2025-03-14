/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <StyledPlayerPanel key={player.id} player={player} css={[panelPosition, positionCss[players.length - 2][index]]}/>
      )}
    </>,
    root
  )
}
const panelPosition = css`
  position: absolute;
  width: 25em;
`

const topLeft = css`
  left: 2em;
  top: 10em;
`

const topRight = css`
  right: 2em;
  top: 10em;
`

const bottomLeft = css`
  left: 2em;
  bottom: 2em;
`

const bottomRight = css`
  right: 2em;
  bottom: 2em;
`


const positionCss = [
  [topLeft, topRight], // 2 players
  [bottomLeft, topLeft, bottomRight], // 3 players
  [bottomLeft, topLeft, topRight, bottomRight], // 4 players
]