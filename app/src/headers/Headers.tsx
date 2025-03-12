/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/dekal/rules/RuleId'
import { ComponentType } from 'react'
import { TheFirstStepHeader } from './TheFirstStepHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseCard]: TheFirstStepHeader
}