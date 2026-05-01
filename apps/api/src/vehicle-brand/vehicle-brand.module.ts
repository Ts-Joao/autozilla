import { Module } from '@nestjs/common';
import { VehicleBrandService } from './vehicle-brand.service';
import { VehicleBrandController } from './vehicle-brand.controller';

@Module({
  providers: [VehicleBrandService],
  controllers: [VehicleBrandController]
})
export class VehicleBrandModule {}
