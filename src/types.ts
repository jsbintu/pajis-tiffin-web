export type PlanDuration = 'WEEKLY' | 'MONTHLY'
export type Diet = 'VEG' | 'NON_VEG'
export type Family = 'SINGLE' | 'COUPLE' | 'FAMILY'
export type Serving = 'REGULAR' | 'LARGE'

export interface AddonType {
  id: string
  key: 'saturday_delivery' | 'sweet_dish' | 'extra_rice' | 'extra_rotis'
  description?: string
  unit: 'PER_MEAL' | 'PER_DELIVERY_DAY' | 'PER_WEEK'
  defaultPriceCad: string | number
}

export interface PlanAddon {
  id: string
  addonTypeId: string
  priceCad: string | number
  addonType: AddonType
}

export interface PlanVariant {
  id: string
  family: Family
  serving: Serving
  diet: Diet
  daysPerWeek: number
  basePriceCad: string | number
  addons: PlanAddon[]
}

export interface PlanResponse {
  plan: { id: string; code: string; duration: PlanDuration; baseInclusions: any }
  variants: PlanVariant[]
}