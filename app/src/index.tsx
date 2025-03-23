/** @jsxImportSource @emotion/react */
import { DekalOptionsSpec } from '@gamepark/dekal/DekalOptions'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { DekalSetup } from '@gamepark/dekal/DekalSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="dekal"
      Rules={DekalRules}
      optionsSpec={DekalOptionsSpec}
      GameSetup={DekalSetup}
      material={Material}
      locators={Locators}
      tutorial={new Tutorial()}
      animations={gameAnimations}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
