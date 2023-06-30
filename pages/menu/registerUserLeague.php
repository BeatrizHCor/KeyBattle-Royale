<?php
include "../authenticate.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name;
    $password;
    $player;
    $erro = false;
    $erro_name = "";
    $messenger = "";
    $erro_password = "";
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
        $player = $_SESSION["id"];
    }
    if (empty($_POST["password"])) {
        $erro_password = "Senha não pode estar vazia";
    } else {
        $password =  md5(htmlspecialchars(stripslashes(trim($_POST["password"]))));
    }
    if (!$erro) {
        $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
        $verify = "SELECT name, keyword, id from league where name = '$name'";
        $result = mysqli_query($conn, $verify);
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $linha = mysqli_fetch_assoc($result);
                if ($password != $linha["keyword"]) {
                    $erro = true;
                    $erro_password = "Senha incorreta";
                } else {
                    $id = $linha["id"];
                    $sql = "INSERT INTO league_player (player, league) VALUES ($player, $id);";
                    if (!mysqli_query($conn, $sql)) {
                        $messenger = "Algo deu errado. Atualize a página e tente novamente";
                        $erro = true;
                    }
                }
            } else {
                $erro = true;
                $erro_name = "Esta liga não existe";
            }
        }
        mysqli_close($conn);
    }
    $json = [
        "erro_password" => $erro_password,
        "erro_name" => $erro_name,
        "messenger" => $messenger
    ];
    echo json_encode($json);
}
