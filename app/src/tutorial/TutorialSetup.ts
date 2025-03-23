import { DekalSetup } from '@gamepark/dekal/DekalSetup'
import { LocationType } from '@gamepark/dekal/material/LocationType'
import { MaterialType } from '@gamepark/dekal/material/MaterialType'


export const me = 1
export const opponent = 2

export class TutorialSetup extends DekalSetup {

  setupFirstPlayerToken() {
    this.material(MaterialType.FirstPlayer)
      .createItem({
        location: {
          type: LocationType.FirstPlayerArea,
          player: me
        }
      })
  }
}
