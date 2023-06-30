<?php
include "../authenticate.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $messenger = "";
    $erro_name = "";
    $erro_password = "";
    $erro_confpass = "";
    $erro = false;
    $name;
    $adm;
    $password;
    $confpass;
    if (empty($_POST["name"])) {
        $erro_name = "Nome não pode estar vazio";
        $erro = true;
    } else {
        $name = htmlspecialchars(stripslashes(trim($_POST["name"])));
    }
    if (empty($_SESSION["id"])) {
        $messenger = "Algo deu errado. Atualize a página e tente novamente";
        $erro = true;
    } else {
        $adm = $_SESSION["id"];
    }
    if (empty($_POST["password"])) {
        $erro_password = "Senha não pode estar vazia";
    } else {
        $password =  md5(htmlspecialchars(stripslashes(trim($_POST["password"]))));
    }
    if (empty($_POST["confpass"])) {
        $erro_confpass = "A confirmação da Senha não pode estar vazia";
    } else {
        $confpass =  md5(htmlspecialchars(stripslashes(trim($_POST["confpass"]))));
    }
    if ($confpass != $password) {
        $erro_confpass = "As senhas não conferem";
    }
    if (!$erro) {
        $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
        $verify = "SELECT name from league where name = '$name'";
        $result = mysqli_query($conn, $verify);
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $erro = true;
                $erro_name = "Este nome ja está em uso";
            } else {
                $sql = "INSERT INTO league (name, adm, keyword) VALUES ('$name', $adm, '$password');";
                if (!mysqli_query($conn, $sql)) {
                    $erro = true;
                    $messenger = "impossivel conectar ao banco de dados.";
                }
            }
        }
        mysqli_close($conn);
    }
    $json = [
        "erro_password" => $erro_password,
        "erro_name" => $erro_name,
        "erro_confpass" => $erro_confpass,
        "messenger" => $messenger,
    ];
    echo json_encode($json);
}
