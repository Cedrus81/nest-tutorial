import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global() makes our exports available to all modules without the need to import manually every time
@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
