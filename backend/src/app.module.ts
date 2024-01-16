import { AuthModule } from '@modules/auth/auth.module';
import { UsuariosModule } from '@modules/usuarios/usuarios.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
