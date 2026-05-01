import { IsNotEmpty, IsString } from "class-validator";

export class CreateFeatureDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
