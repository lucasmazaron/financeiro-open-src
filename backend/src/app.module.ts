import { AuthModule } from '@modules/auth/auth.module';
import { ControleMensalModule } from '@modules/controle-mensal/controle-mensal.module';
import { UsuariosModule } from '@modules/usuarios/usuarios.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UsuariosModule, ControleMensalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
