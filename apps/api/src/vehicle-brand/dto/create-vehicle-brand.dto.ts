import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleBrandDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string
}