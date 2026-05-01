import { FuelType, Transmission, VehicleColor, VehicleCondition } from "@prisma/client"
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
    readonly fuelType: FuelType

    @IsEnum(VehicleColor)
    readonly color: VehicleColor

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

    @IsInt()
    readonly categoryId: number

    @IsInt()
    readonly modelId: number

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    readonly photos: string[]

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    @IsNotEmpty({ each: true })
    readonly features?: number[]

    @IsOptional()
    @IsBoolean()
    readonly armored?: boolean
}