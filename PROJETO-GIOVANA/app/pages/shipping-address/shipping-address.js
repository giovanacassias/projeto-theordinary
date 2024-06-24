import { Address } from "../../model/address.js";
import { User } from "../../model/user.js";
import { UserService } from "../../service/user.service.js";

//Limpando o formulário
document.querySelector("#reset-button").addEventListener("click", function () {
  let formInputs = document.querySelectorAll("input");
  for (let element of formInputs) {
    element.value = "";
  }
});

/* function getCityByPostalCode() {
  let postalCode = document.getElementById("input-postalcode").value;

  let userService = new UserService();
  let city = userService.getCityFromPostalCode(postalCode);
  //userService.fetchCityFromCep(postalCode);

  document.getElementById("input-city").innerHTML = city.localidade;

} */

function submitHandler() {
  document.getElementById("address-form").onsubmit = function (event) {
    event.preventDefault(); //evitando o reload da página

    let userService = new UserService();

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

    //validando campo do nome

    document
      .querySelector("#input-firstname")
      .addEventListener("invalid", function () {
        if (firstName.validity.valueMissing) {
          let error = "O campo não pode ficar vazio";
          firstName.setCustomValidity(error);
        }
        if (firstName.validity.patternMismatch) {
          let error =
            "O nome deve começar com maiúscula e não deve conter números";
          firstName.setCustomValidity(error);
        }
        firstName.setCustomValidity("");
      });

    //Instanciando a classe User com os dados coletados
    let userAddress = new Address(address, city, state, country, postalCode);

    let user = new User(
      firstName,
      lastName,
      socialId,
      phoneNumber,
      userAddress
    );

    //Guardando no local storage
    let response = userService.saveLocal(user);

    if (response) {
      alertify.success("Endereço cadastrado com sucesso!");
    } else {
      alertify.success("Falha ao cadastrar o endereço!");
    }

    //Usando Fetch API
    userService
      .insertUserWithFetch(user)
      .then((response) => response.json())
      .then((data) => {
        console.log("Successo:", data);
        alertify.success("Endereço cadastrado com sucesso!");
        document.getElementById("address-form").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alertify.error("Erro ao cadastrar o endereço.");
      });
  };
}

document.addEventListener('DOMContentLoaded', function() {
  //getCityByPostalCode();
  submitHandler();
});

