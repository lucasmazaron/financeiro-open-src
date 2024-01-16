declare namespace Express {
  export interface Request {
    user: {
      id: string;
      nome_usuario: string;
    };
  }
}
