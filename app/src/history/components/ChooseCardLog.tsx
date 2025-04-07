import { css } from '@emotion/react'
import { MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Back from '../../images/cards/back.jpg'

export const ChooseCardLog: FC<MoveComponentProps> = (props) => {
  const move = props.move as MoveItem
  const name = usePlayerName(move.location.player)
  return (
    <>
      <Trans defaults="log.choose" values={{ player: name }} components={{ back: <Picture src={Back} css={pictureCss}/> }}/>
    </>
  )
}


const pictureCss = css`
    height: 2em;
`
