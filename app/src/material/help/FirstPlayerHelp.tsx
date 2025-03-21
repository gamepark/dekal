/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'


export const FirstPlayerHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const name = usePlayerName(item.location?.player)
  return (
    <>
      <h2>{t('help.firstplayer')}</h2>
      <p>
        <Trans defaults="help.firstplayer.desc" components={BaseComponents} />
      </p>
      <p>
        <Trans defaults="help.firstplayer.player" components={BaseComponents} values={{ player: name}} />
      </p>
    </>
  )
}


const underLineCss = css`
    text-decoration: underline;
`

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  underline: <span css={underLineCss}/>
}
