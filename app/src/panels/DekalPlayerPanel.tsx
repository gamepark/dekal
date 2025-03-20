/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { StyledPlayerPanel, usePlayerId, useRules } from '@gamepark/react-game'
import { Player } from '@gamepark/react-client'
import { FC, HTMLAttributes, useMemo } from 'react'
import { gameCardDescription } from '../material/GameCardDescription'

type DekalPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const DekalPlayerPanel: FC<DekalPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const playerId = usePlayerId()
  const rules = useRules<DekalRules>()!
  const itsMe = playerId === player.id
  const dropAreaCards = rules.material(MaterialType.Card).location(LocationType.DropArea)
  const playerFocus = useMemo(() => ({
    materials: [
      rules.material(MaterialType.Card).location(LocationType.Tableau).player(player.id),
      ...(!itsMe || !dropAreaCards.length? []: [rules.material(MaterialType.Card).location(LocationType.DropArea)]),
    ],
    staticItems: [],
    locations: [
    ],
    margin: {
      top: itsMe && dropAreaCards.length? 2:8,
      bottom: itsMe? 15: 8
    },
    animationTime: 400
  }), [rules, player])
  const id = player.id

  return (
    <StyledPlayerPanel
      player={player}
      playerFocus={playerFocus}
      backgroundImage={gameCardDescription.images[id]}
      css={backgroundPosition}
      { ...rest }
    />
  )
}

const backgroundPosition = css`
    background-color: white;
  background-position: 0% center;
  background-size: 80%;
`
