import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { VehicleCategoryService } from './vehicle-category.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtGuard } from 'src/common/guards/jwt-guard.guard';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('vehicle-category')
export class VehicleCategoryController {
    constructor(readonly service: VehicleCategoryService) {}

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    createCategory(@Body() dto: CreateVehicleCategoryDto) {
        return this.service.create(dto)
    }

    @Get()
    getAll() {
        return this.service.findAll()
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.service.findOne(id)
    }

    @Patch(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    updateCategory(@Param('id') id: number, @Body() dto: UpdateVehicleCategoryDto) {
        return this.service.update(id, dto)
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    deleteCategory(@Param('id') id: number) {
        return this.service.remove(id)
    }
}
