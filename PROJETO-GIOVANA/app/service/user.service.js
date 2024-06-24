export class UserService {
  constructor() {}

  async getCityFromPostalCode(postalCode) {
    try {

      const url = `http://viacep.com.br/ws/${postalCode}/json/`;
      const data = await fetch(url);
      const address = await data.json();
      console.log(data);
      return data.localidade;
      } catch (error) {
        // Captura e trata erros durante a requisição
        console.error("Falha ao retornar a cidade:", error);
        throw error; // Propaga o erro para quem chamou a função
      }
  }







     /*  // Faz uma solicitação à API do ViaCEP usando o Fetch API
      const response = await fetch(
        `http://viacep.com.br/ws/${postalCode}/json/`, {mode: "no-cors"}
      );

      // Converte a resposta de JSON para objeto
      const data = await response.json();
      console.log(data);

      // Retorna o nome da cidade obtido do CEP
      return data.localidade;
    } catch (error) {
      // Captura e trata erros durante a requisição
      console.error("Falha ao retornar a cidade:", error);
      throw error; // Propaga o erro para quem chamou a função
    }
  }
 */
  

  // Constante para a chave do armazenamento local
  LOCAL_STORAGE_KEY = "users";

  saveLocal(user) {
    // Obtendo USUARIOS do armazenamento local
    let users = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    // Verificando se há usuarios existentes
    users = users ? JSON.parse(users) : [];

    // Adicionando o novo usuário ao array
    users.push(user);

    // Salvando os usuários atualizados no armazenamento local
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));

    // Retornando os relatórios atualizados
    return true;
  }

  //listUsers() busca uma lista dos endereços cadastrados
  async listUsers() {
    const url = `http://localhost:3000/users`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Propaga o erro para ser tratado externamente
    }
  }

  //Inserindo um endereço no JSON Server via Fetch API

  async insertUserWithFetch(data) {
    const url = `http://localhost:3000/users`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
