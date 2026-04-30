import { FuelType, Transmission, VehicleCondition, VehicleFeature } from "@prisma/client"
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min } from "class-validator"

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    readonly model: string

    @IsString()
    @IsNotEmpty()
    readonly brand: string

    @IsString()
    @IsNotEmpty()
    readonly version: string

    @IsInt()
    readonly year: number

    @Min(0)
    @IsNumber()
    readonly price: number

    @Min(0)
    @IsInt()
    readonly mileage: number

    @IsEnum(FuelType)
    readonly fuel: FuelType

    @IsString()
    @IsNotEmpty()
    readonly color: string

    @IsEnum(Transmission)
    readonly transmission: Transmission

    @IsEnum(VehicleCondition)
    readonly condition: VehicleCondition

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]$/)
    readonly plateFinal: string

    @IsString()
    @IsNotEmpty()
    readonly city: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{2}$/)
    readonly state: string

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    readonly photos: string[]

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    readonly features?: VehicleFeature[]

    @IsOptional()
    @IsBoolean()
    readonly armored?: boolean
}