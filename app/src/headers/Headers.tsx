/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseCardHeader } from './ChooseCardHeader'
import { ChooseRevealedHeader } from './ChooseRevealedHeader'
import { CleanupHeader } from './CleanupHeader'
import { RevealHeader } from './RevealHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseCard]: ChooseCardHeader,
  [RuleId.RevealCard]: RevealHeader,
  [RuleId.ChooseRevealedCard]: ChooseRevealedHeader,
  [RuleId.CleanupTableau]: CleanupHeader
}
