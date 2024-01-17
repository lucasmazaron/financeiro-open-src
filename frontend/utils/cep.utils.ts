import axios from "axios";

export const buscaCepUtil = async (cep: string): Promise<any> =>
  axios.get(
    `https://viacep.com.br/ws/${cep.replace("-", "").replace(".", "")}/json/`
  );
