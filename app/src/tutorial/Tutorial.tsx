/** @jsxImportSource @emotion/react */
import { PlayerId } from '@gamepark/dekal/DekalOptions'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'


const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
}

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 2

  options = {
    players: [
      { id: me },
      { id: opponent }
    ]
  }

  players = [
    { id: me },
    { id: opponent }
  ]
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.welcome" components={BaseComponents} />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.tableau" components={BaseComponents} />
        ),
        position: { x: 39 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.Tableau).player(me)
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 37
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.choose" components={BaseComponents} />
        ),
        position: { y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location((l) => l.type === LocationType.Tableau && l.x === 3 && l.y === 1).player(me)
        ],
        locations: [
          { type: LocationType.DropArea, player: me, rotation: true }
        ],
        margin: {
          top: 5,
          bottom: 15,
          right: 20,
          left: 0
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move)
          && move.location.type === LocationType.DropArea && move.location.player === me
          && game.items[MaterialType.Card]![move.itemIndex].location.x === 3 && game.items[MaterialType.Card]![move.itemIndex].location.y === 1
      }
    },
    {
      move: {
        player: opponent,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.RevealCard
      },
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.simultaneous" components={BaseComponents} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea)
        ],
        margin: {
          bottom: 15,
          top: 2
        }
      }),
      move: { }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.first" components={BaseComponents} />
        ),
        position: { y: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FirstPlayer)
        ],
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.expl" components={BaseComponents} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea)
        ],
        margin: {
          bottom: 15,
          top: 2
        }
      }),
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.insert" components={BaseComponents} />
        ),
        position: { x: 27, y: 25  }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea)
        ],
        locations: [
          this.location(LocationType.Tableau).player(me).x(-1).y(1).location,
          this.location(LocationType.Tableau).player(me).x(3).y(-1).location,
          this.location(LocationType.Tableau).player(me).x(3).y(4).location
        ],
        margin: {
          left: 5,
          right: 45,
          bottom: 1,
          top: 2
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.play.1" components={BaseComponents} />
        ),
        position: { y: 30  }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea).player(opponent)
        ],
        locations: [
          this.location(LocationType.Tableau).player(me).x(3).y(-1).location,
        ],
        margin: {
          left: 5,
          right: 5,
          bottom: 17,
          top: 2
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move)
          && game.items[MaterialType.Card]![move.itemIndex].location.player === opponent
          && move.location.type === LocationType.Tableau && move.location.x === 3 && move.location.y === -1
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.play" components={BaseComponents} />
        )
      }
    },
    {
      move: {
        player: opponent,
        interrupt: (move) => isMoveItemType(MaterialType.FirstPlayer)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.first.change" components={BaseComponents} />
        )
      },
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.new" components={BaseComponents} />
        ),
        position: { y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location((l) => l.type === LocationType.Tableau && l.x === 1 && l.y === 1).player(me)
        ],
        locations: [
          { type: LocationType.DropArea, player: me, rotation: true }
        ],
        margin: {
          top: 5,
          bottom: 15,
          right: 20,
          left: 0
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move)
          && move.location.type === LocationType.DropArea && move.location.player === me
          && game.items[MaterialType.Card]![move.itemIndex].location.x === 1 && game.items[MaterialType.Card]![move.itemIndex].location.y === 1
      }
    },
    {
      move: {
        player: opponent,
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.first" components={BaseComponents} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea)
        ],
        margin: {
          bottom: 15,
          top: 2
        }
      })
    },
    {
      move: {
        player: opponent,
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.play.2" components={BaseComponents} />
        ),
        position: { x: 30, y: 15  }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.DropArea)
        ],
        locations: [
          this.location(LocationType.Tableau).player(me).x(4).y(1).location
        ],
        margin: {
          left: 5,
          right: 20,
          bottom: 20,
          top: 10
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.Card)(move)
          && move.location.type === LocationType.Tableau && move.location.x === 4 && move.location.y === 1
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.end" components={BaseComponents} />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.goal" components={BaseComponents} />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.score" components={BaseComponents} />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.go" components={BaseComponents} />
        )
      }
    },
]
}
