import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor (private readonly usersServices: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersServices.create(createUserDto)
    }

    @Get()
    getUsers() {
        return this.usersServices.get()
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersServices.getById(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersServices.update(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersServices.remove(id)
    }
}
