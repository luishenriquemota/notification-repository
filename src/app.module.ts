import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http.module';
import { DatabaseModule } from './infra/database/database.module';

// podemos criar varios modulos e importar um dentro do outro
@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
