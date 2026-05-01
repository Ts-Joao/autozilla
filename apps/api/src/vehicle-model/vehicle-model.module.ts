import { Module } from '@nestjs/common';
import { VehicleModelController } from './vehicle-model.controller';
import { VehicleModelService } from './vehicle-model.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [VehicleModelController],
    providers: [VehicleModelService],
})
export class VehicleModelModule {}
