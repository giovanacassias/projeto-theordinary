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
  }
  