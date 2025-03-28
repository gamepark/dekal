import { css } from '@emotion/react'
import { MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import First from '../../images/first-player/first-player.png'

export const ChangeFirstPlayerLog: FC<MoveComponentProps> = (props) => {
  const move = props.move as MoveItem
  const name = usePlayerName(move.location.player)

  return (
    <>
      <Trans defaults="log.change.first" values={{ player: name }} components={{ first: <Picture src={First} css={pictureCss}/> }} />
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
