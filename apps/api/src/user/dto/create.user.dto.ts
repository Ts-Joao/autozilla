import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string
}