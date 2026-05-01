import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string
}