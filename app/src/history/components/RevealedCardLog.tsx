import { css } from '@emotion/react'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { gameCardDescription } from '../../material/GameCardDescription'

export const RevealedCardLog: FC<MoveComponentProps> = (props) => {
  const { game } = props.context
  const move = props.move as MoveItem
  const name = usePlayerName(move.location.player)
  const item = new DekalRules(game).material(MaterialType.Card).getItem(move.itemIndex)!

  return (
    <>
      <Trans defaults="log.reveal" values={{ player: name }} components={{ card: <Picture src={gameCardDescription.images[(move.reveal?.id ?? item.id) as number]} css={pictureCss}/> }}/>
    </>
  )
}


const pictureCss = css`
    height: 2em;
`
