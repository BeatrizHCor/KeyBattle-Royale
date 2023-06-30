<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $erro = false;
    $mensagem = "";
    if (empty($_SESSION["id"])) {
        $mensagem = "Usuario não encontrado";
        $erro = true;
    } else
    if (empty($_POST["ID_league"])) {
        $mensagem = "Liga não encontrado";
        $erro = true;
    } else
    if (empty($_POST["score"])) {
        $mensagem = "O score não pode estar vazio";
        $erro = true;
    } else {
        $ID_user = $_SESSION["id"];
        $ID_league = $_POST["ID_league"];
        $score = $_POST["score"];
        $date = new DateTime("now");
        $dateS = $date->format('Y-m-d H:i:s');
        $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
        $sql = "insert into scores_player(score,player,league,date) values('$score',$ID_user,$ID_league, '$dateS')";
        if (mysqli_query($conn, $sql)) {
            $mensagem = "ok";
        } else {
            $mensagem = "Algo deu errado, tente novamente mais tarde";
            $erro = true;
        }
        mysqli_close($conn);
    }
    echo $erro;
    echo $mensagem;
}
