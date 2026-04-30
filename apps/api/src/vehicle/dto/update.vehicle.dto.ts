import { IsBoolean, IsEnum, IsOptional } from "class-validator"
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

    @IsBoolean()
    @IsOptional()
    readonly sponsored?: boolean
}