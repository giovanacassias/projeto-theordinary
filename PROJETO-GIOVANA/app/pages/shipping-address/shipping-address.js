import { Address } from "../../model/address.js";
import { User } from "../../model/user.js";
import { UserService } from "../../service/user.service.js";

//Limpando o formulário

let main = function () {
  document
    .querySelector("#reset-button")
    .addEventListener("click", function () {
      let formInputs = document.querySelectorAll("input");
      for (let element of formInputs) {
        element.value = "";
      }
    });

    //Adiciona máscara aos inputs com JQuery Mask Plugin
  $(function () {
    $('#input-socialid').mask('000.000.000-00', { reverse: false });
  });

  function validateNameField() {
    const nameInput = document.getElementById("input-firstname");

    if (nameInput.validity.valueMissing) {
      let error = "O campo não pode ficar vazio";
      nameInput.setCustomValidity(error);
      return;
    }
    if (nameInput.validity.patternMismatch) {
      let error = "O nome deve começar com maiúscula e não deve conter números";
      nameInput.setCustomValidity(error);
      return;
    }
    nameInput.setCustomValidity("");
    return;
  }

  //Customização das mensagens no balão

  document
    .querySelector("#input-firstname")
    .addEventListener("invalid", function () {
      validateNameField();
    });

  //funções para checar validade dos inputs

  //evitando a recarga da página uma vez que o botão for clicado

  document.getElementById("address-form").onsubmit = function (event) {
    event.preventDefault();

    //coletando os dados do formulário
    let firstName = document.getElementById("input-firstname").value;

    let lastName = document.getElementById("input-lastname").value;

    let address = document.getElementById("input-address").value;

    let city = document.getElementById("input-city").value;

    let state = document.getElementById("input-state").value;

    let country = document.getElementById("input-country").value;

    let socialId = document.getElementById("input-socialid").value;

    let phoneNumber = document.getElementById("input-phone").value;

    let postalCode = document.getElementById("input-postalcode").value;

    //Instanciando a classe User com os dados coletados
    let userAddress = new Address(address, city, state, country, postalCode);

    let user = new User(
      firstName,
      lastName,
      socialId,
      phoneNumber,
      userAddress
    );

    let userService = new UserService();
    let response = userService.saveLocal(user);

    if(response){
        alertify.success('Usuário cadastrado com sucesso!');
    }
    else{
        alertify.success('Falha ao cadastrar o usuário!');
    }

    document.getElementById("li-firstname").textContent = user.firstName;
    document.getElementById("li-lastname").textContent = user.lastName;
    document.querySelector("#li-address").textContent = userAddress.address;
    document.getElementById("li-city").textContent = userAddress.city;
    document.getElementById("li-state").textContent = userAddress.state;
    document.getElementById("li-country").textContent = userAddress.country;
    document.getElementById("li-socialid").textContent = user.socialId;
    document.getElementById("li-phone").textContent = user.phoneNumber;
    document.getElementById("li-postalcode").textContent =
      userAddress.postalCode;
  };
};

/* function validateNameField() {
  const nameInput = document.getElementById("input-firstname");

  if (nameInput.validity.valueMissing) {
    let error = "O campo não pode ficar vazio";
    nameInput.setCustomValidity(error);
    return;
  }
  if (nameInput.validity.patternMismatch) {
    let error = "O nome deve começar com maiúscula e não deve conter números";
    nameInput.setCustomValidity(error);
    return;
  }
  nameInput.setCustomValidity("");
}
 */
main();
