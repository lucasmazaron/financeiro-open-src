import { DatabaseService } from '@database/DatabaseService';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@utils/CryptUtils';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async logar(email: string, senha: string): Promise<any> {
    const usuario = await this.db.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!!usuario && Object.keys(usuario).length !== 0) {
      const empresa = await this.db.empresa.findFirst({
        where: {
          id: usuario.id_empresa,
        },
      });

      if (!(await comparePassword(senha, usuario.senha))) {
        throw new UnauthorizedException('Senha inválida!');
      }

      if (!empresa.ativo) {
        throw new UnauthorizedException('Empresa desativada!');
      }

      if (!usuario.ativo) {
        throw new UnauthorizedException('Usuário desativado!');
      }

      const payload = { sub: usuario.id, nome_usuario: usuario.nome };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          id_empresa: usuario.id_empresa,
          nome_empresa: empresa.nome,
        },
      };
    }

    throw new UnauthorizedException('Usuário não encontrado!');
  }
}
