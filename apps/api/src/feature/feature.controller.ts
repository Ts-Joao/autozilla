import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { JwtGuard } from 'src/common/guards/jwt-guard.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('feature')
export class FeatureController {
    constructor(private readonly featureService: FeatureService) { }

    @Post()
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    async create(@Body() dto: CreateFeatureDto) {
        return this.featureService.create(dto)
    }

    @Get()
    async findAll() {
        return this.featureService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.featureService.findOne(id)
    }

    @Patch(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    async update(@Param('id') id: number, @Body() dto: UpdateFeatureDto) {
        return this.featureService.update(id, dto)
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(JwtGuard, RolesGuard)
    async remove(@Param('id') id: number) {
        return this.featureService.remove(id)
    }
}
