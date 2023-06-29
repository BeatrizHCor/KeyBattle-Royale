<?php


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $league = $_GET["league"];
    $time = $_GET["time"];
    $select = "SELECT * FROM scores_player ";
    $where = "";
    $date = new DateTime('7 days ago');
    switch ($league) {
        default:
            $where += "WHERE league = '$league'";
            break;
        case "all":
            break;
    }
    switch ($time) {
        default:
            if ($where != "") {
                $where += " AND ";
            }
            $where += " WHERE date > " . $date->format('Y-m-d H:i:s');
    }
    $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
    $query = $select + $where . "ORDER by score desc LIMIT 10";
    $result = mysqli_query($conn, $query);
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $linha = mysqli_fetch_assoc($result);
        } else {
            $mensagem = "Senha ou Usários incorretos";
        }
    } else {
        $mensagem = "Algo deu errado, tente novamente.";
    }
    mysqli_close($conn);
}
