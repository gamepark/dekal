/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { Player } from '@gamepark/react-client'
import { StyledPlayerPanel, usePlayerId, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useMemo } from 'react'
import One from '../images/panels/1.jpg'
import Two from '../images/panels/2.jpg'
import Three from '../images/panels/3.jpg'
import Four from '../images/panels/4.jpg'
import Five from '../images/panels/5.jpg'
import Six from '../images/panels/6.jpg'

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
      backgroundImage={PanelImage[id - 1]}
      css={backgroundPosition}
      { ...rest }
    />
  )
}

const backgroundPosition = css`
    background-color: white;
    background-size: auto 100%;
`

const PanelImage = [
  One, Two, Three, Four, Five, Six
]
