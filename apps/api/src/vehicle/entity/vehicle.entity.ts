import { FuelType, Photo, Transmission, VehicleColor, VehicleCondition, VehicleFeature, VehicleStatus } from "@prisma/client"

export type Vehicle = {
    id: string
    model: string
    brand: string
    version: string
    year: number
    price: number
    mileage: number
    fuel: FuelType
    color: VehicleColor
    transmission: Transmission
    condition: VehicleCondition
    plateFinal: string
    city: string
    state: string
    ownerId: string
    photos?: Photo[]
    features?: VehicleFeature[]
    sponsored?: boolean
    inspected?: boolean
    status?: VehicleStatus
}