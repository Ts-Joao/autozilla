import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VehicleBrandService } from './vehicle-brand.service';
import { JwtGuard } from 'src/common/guards/jwt-guard.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreateVehicleBrandDto } from './dto/create-vehicle-brand.dto';
import { UpdateVehicleBrandDto } from './dto/update-vehicle-brand.dto';

@Controller('vehicle-brand')
export class VehicleBrandController {
    constructor(private readonly service: VehicleBrandService) {}

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    createBrand(@Body() dto: CreateVehicleBrandDto) {
        return this.service.create(dto)
    }

    @Get()
    getAll() {
        return this.service.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id)
    }

    @Patch(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    updateBrand(@Param('id') id: number, @Body() dto: UpdateVehicleBrandDto) {
        return this.service.update(id, dto)
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    deleteBrand(@Param('id') id: number) {
        return this.service.remove(id)
    }
}
