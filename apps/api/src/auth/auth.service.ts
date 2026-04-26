import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existEmail = await this.databaseService.user.findUnique({
            where: { email: dto.email },
        })

        if (existEmail) {
            throw new UnauthorizedException("Email already exists")
        }

        const hash = await bcrypt.hash(dto.password, 12)

        const user = await this.databaseService.user.create({
            data: { name: dto.name, email: dto.email, password: hash },
            select: { id: true, email: true, role: true, name: true }
        })

        return { user, token: this.signToken(user.id, user.email, user.role) }
    }

    async validateUser(email: string, password: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
        })

        if (!user) {
            return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return null
        }

        return user
    }

    async login(id: string, email: string, role: UserRole) {
        const user = await this.databaseService.user.findUnique({
            where: { id },
        })

        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        return { user, token: this.signToken(user.id, user.email, user.role) }
    }

    private signToken(sub: string, email: string, role: UserRole) {
        return this.jwtService.sign({ sub, email, role })
    }
}
