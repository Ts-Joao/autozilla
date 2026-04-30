import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./create.user.dto";
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly phone?: string

    @IsNotEmpty()
    @IsOptional()
    readonly avatar?: string
}