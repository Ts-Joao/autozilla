import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string
}