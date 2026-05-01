import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateVehicleModelDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsInt()
    @IsNotEmpty()
    readonly brandId: number
}