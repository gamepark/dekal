import { css } from '@emotion/react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'


export const GameCardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.card')}</h2>
      <p>
        <Trans i18nKey="help.card.desc" components={BaseComponents} />
      </p>
      <p>
        <Trans i18nKey="help.end" components={BaseComponents} />
        <br /><br />
        <Trans i18nKey="help.end.desc" components={BaseComponents} />
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
