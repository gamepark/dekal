import { DekalOptionsSpec } from '@gamepark/dekal/DekalOptions'
import { DekalRules } from '@gamepark/dekal/DekalRules'
import { DekalSetup } from '@gamepark/dekal/DekalSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { DekalHistory } from './history/DekalHistory'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { MaterialI18n } from './material/MaterialI18n'
import { Tutorial } from './tutorial/Tutorial'
import { TutorialAI } from './tutorial/TutorialAI'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="dekal"
      Rules={DekalRules}
      optionsSpec={DekalOptionsSpec}
      GameSetup={DekalSetup}
      material={Material}
      materialI18n={MaterialI18n}
      locators={Locators}
      tutorial={new Tutorial()}
      animations={gameAnimations}
      logs={new DekalHistory()}
      ai={TutorialAI}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
