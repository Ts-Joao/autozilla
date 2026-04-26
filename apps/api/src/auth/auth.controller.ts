import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req: any) {
        const { id, email, role } = req.user
        return this.authService.login(id, email, role)
    }
}
