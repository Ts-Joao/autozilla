import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { CreateVehicleDto } from "./create.vehicle.dto"
import { PartialType } from "@nestjs/mapped-types"
import { VehicleStatus } from "@prisma/client"

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    @IsOptional()
    @IsEnum(VehicleStatus)
    readonly status?: VehicleStatus

    @IsBoolean()
    @IsOptional()
    readonly inspected?: boolean

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly addPhotos?: string[]

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly removePhotos?: number[]

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly addFeatures?: number[]

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly removeFeatures?: number[]
}