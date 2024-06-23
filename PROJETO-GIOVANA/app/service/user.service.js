export class UserService {
  constructor() {}

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

  //Inserindo um endereço via Fetch API

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