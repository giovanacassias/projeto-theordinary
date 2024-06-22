$(function () {
    $('#menu').load("PROJETO-GIOVANA/app/pages/app/util/header.html");
});

//Adiciona máscara aos inputs com JQuery Mask Plugin
$(function () {
    $('#input-socialid').mask('000.000.000-00', { reverse: false });
    $('#input-postalcode').mask('00000-000', { reverse: false });
    $('#input-phone').mask('(00) 00000-0000', { reverse: false });
});