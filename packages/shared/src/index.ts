// Enums Database
export enum FuelType {
  GASOLINE = 'GASOLINE',
  ETHANOL = 'ETHANOL',
  FLEX = 'FLEX',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

export enum VehicleCondition {
  NEW = 'NEW',
  USED = 'USED',
}

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RESERVED = 'RESERVED',
}

// Tipos de resposta da API
export interface VehicleSummary {
  id: string
  slug: string
  year: number
  price: number
  mileage: number
  city: string
  state: string
  condition: VehicleCondition
  status: VehicleStatus
  categoryId: number
}

export interface RecommendationResponse {
  vehicles: VehicleSummary[]
  basedOn: 'view_history' | 'similar'
}