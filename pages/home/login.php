<?php
require "../authenticate.php";
$erro = false;
$erro_password = "";
$erro_username = "";
$erro_email = "";
$erro_confsenha = "";
$erro_usernameReg = "";
$erro_passwordReg = "";
$mensagem = "";

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["form_name"] == "login") {
    $erro = false;
    if (empty($_POST["username"])) {
        $erro_username = "Usuário não pode estar vazio";
        $erro = true;
    } else {
        $usuario = $_POST["username"];
    }
    if (empty($_POST["password"])) {
        $erro_password = "Senha não pode estar vazia";
        $erro = true;
    } else {
        $senha = $_POST["password"];
    }
    if (!$erro) {
        $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
        $sql = "SELECT id, username, password from auth_user WHERE username = '$usuario';";
        $result = mysqli_query($conn, $sql);
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $linha = mysqli_fetch_assoc($result);
                if ($linha["password"] == md5($senha)) {
                    $_SESSION["username"] = $linha["username"];
                    $_SESSION["id"] = $linha["id"];
                    $login = true;
                } else {
                    $mensagem = "Senha ou Usários incorretos";
                }
            } else {
                $mensagem = "Senha ou Usários incorretos";
            }
        } else {
            $mensagem = "Algo deu errado, tente novamente.";
        }
        mysqli_close($conn);
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["form_name"] == "registro") {
    $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
    $erro = false;
    if (empty($_POST["usernameReg"])) {
        $erro_usernameReg = "Usuário não pode estar vazio";
        $erro = true;
    } else {
        $user_reg = $_POST["usernameReg"];
    }
    if (empty($_POST["emailReg"])) {
        $erro_email = "Email não pode estar vazio";
        $erro = true;
    } else if (!filter_var($_POST["emailReg"], FILTER_VALIDATE_EMAIL)) {
        $erro_email = "Email não é valido";
        $erro = true;
    } else {
        $email_reg = $_POST["emailReg"];
    }
    if (empty($_POST["passwordReg"])) {
        $erro_passwordReg = "Senha não pode estar vazia";
        $erro = true;
    } else {
        $password_reg = md5($_POST["passwordReg"]);
    }
    if (empty($_POST["passwordConfReg"])) {
        $erro_confsenha = "Confirmaçao da senha não pode estar vazia";
        $erro = true;
    } else if ($_POST["passwordConfReg"] != $_POST["passwordReg"]) {
        $erro_confsenha = "Senhas não conferem";
        $erro = true;
    } else {
        $password_conf_reg = $_POST["passwordConfReg"];
    }
    $verify = "SELECT username from auth_user where username = '$user_reg'";
    $result = mysqli_query($conn, $verify);
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $erro = true;
            $erro_usernameReg = "Este nome ja está em uso";
        } else {
            if (!$erro) {
                $sql = "INSERT INTO auth_user (email, username, password) VALUES ('$email_reg', '$user_reg', '$password_reg');";
                if (mysqli_query($conn, $sql)) {
                    $mensagem = "";
                } else {
                    $mensagem = mysqli_error($conn);
                }
                mysqli_close($conn);
            }
        }
    }
}
$json = [
    "erro_password" => $erro_password,
    "erro_username" => $erro_username, "erro_email" => $erro_email,
    "erro_confsenha" => $erro_confsenha, "erro_usernameReg" => $erro_usernameReg,
    "erro_passwordReg" => $erro_passwordReg,
    "mensagem" => $mensagem
];
echo json_encode($json);
