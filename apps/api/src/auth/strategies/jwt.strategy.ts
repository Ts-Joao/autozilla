import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserRole } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";
import { ConfigService } from "@nestjs/config";

export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly databaseService: DatabaseService,
        private config: ConfigService
    ) {
        const secret = config.get<string>('JWT_SECRET');

        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.databaseService.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, role: true }
        })

        if (!user) throw new UnauthorizedException("Invalid token")
        return user
    }
}