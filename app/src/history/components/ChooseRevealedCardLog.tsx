import { css } from '@emotion/react'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { gameCardDescription } from '../../material/GameCardDescription'

export const ChooseRevealedCardLog: FC<MoveComponentProps> = (props) => {
  const rules = new DekalRules(props.context.game)
  const move = props.move as MoveItem
  const name = usePlayerName(move.location.player)
  const isLine = move.location.x! < 0 || move.location.x! > 3
  const item = rules.material(MaterialType.Card).getItem(move.itemIndex)
  return (
    <>
      <Trans defaults={isLine? "log.choose.line": "log.choose.column"} values={{ player: name, line: move.location.y! + 1, column: move.location.x! + 1 }} components={{ card: <Picture src={gameCardDescription.images[item.id as number]} css={pictureCss}/> }}/>
    </>
  )
}


const pictureCss = css`
    height: 2em;
    position: relative;
    
    > picture {
        margin: 0;
    }
`
