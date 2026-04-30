import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createUserDto: CreateUserDto) {
        try {
            await this.existEmail(createUserDto.email)

            const hased = bcrypt.hashSync(createUserDto.password)

            const user = await this.databaseService.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: hased
                }
            })

            return user
        } catch (error ) {
            if (error instanceof HttpException ) {
                throw error
            }

            throw new InternalServerErrorException()
        }
    }

    async get() {
        try {
            return await this.databaseService.user.findMany()
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async getById(id: string) {
        try {            
            const user = await this.databaseService.user.findUnique({
                where: { id }
            })

            if (!user) {
                throw new HttpException('User ID Not Found!', HttpStatus.NOT_FOUND)
            }

            return user
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }

            throw new InternalServerErrorException()
        }
    }
    
    async existEmail(email: string) {
        try {            
            const existEmail = await this.databaseService.user.findUnique({
                where: { email }
            })

            if (existEmail) {
                throw new HttpException('Email Already exist!', HttpStatus.CONFLICT)
            }

            return existEmail
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }

            throw new InternalServerErrorException()
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            await this.getById(id)

            const { password, avatar, ...rest } = updateUserDto

            if (updateUserDto.email) {
                await this.existEmail(updateUserDto.email)
            }

            const user = await this.databaseService.user.update({
                where: { id },
                data: {
                    ...rest,
                    ...(password && { password: bcrypt.hashSync(password, 10) }),
                    ...(avatar && {
                        avatar: {
                            upsert: {
                                create: { url: avatar },
                                update: { url: avatar }
                            }
                        }
                    })
                }
            })

            return user
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException()
        }
    }

    async remove(id: string) {
        try {
            await this.getById(id)

            return await this.databaseService.user.delete({
                where: { id }
            })
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
