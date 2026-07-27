import { css } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LiveLogContainer, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), process.env.NODE_ENV === 'development' ? 0 : 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!!game && <GameDisplay players={game.players.length} />}
      <LoadingScreen display={loading} />
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
      {!loading && <LiveLogContainer css={[liveLogCss, liveLogPosition(game.players.length)]} />}
    </>
  )
}

const liveLogCss = css`
  position: absolute;
  right: 1em;
  width: 45em;
  pointer-events: none;
`

const liveLogPosition = (players: number) => {
  switch (players) {
    case 2:
    case 3:
      return css`
        top: 9em;
      `
    default:
      return css`
        top: 18em;
      `
  }
}
