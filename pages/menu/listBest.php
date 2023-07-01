<?php


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $league = $_GET["league"];
    $time = $_GET["time"];
    $select = "SELECT sp.*, p.username, l.name  FROM scores_player sp INNER JOIN auth_user p on p.id = sp.player INNER JOIN league l on l.id = sp.league";
    $where = "";
    $json = [];
    $i;
    switch ($league) {
        default:
            $where = $where . " WHERE name = '$league'";
            break;
        case "all":
            break;
    }
    switch ($time) {
        default:
            $date = new DateTime('7 days ago');
            if ($where != "") {
                $where = $where . " AND ";
            }
            $where =  $where . " WHERE date > " . $date->format('Y-m-d H:i:s');
        case "all":
            break;
    }
    $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
    $query = $select . $where . " ORDER by score desc LIMIT 10";
    $result = mysqli_query($conn, $query);
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $i = ['player' => $row['username'], "score" => $row['score'], "date" => $row['date'], "league" => $row['name']];
                array_push($json, $i);
            }
        } else {
            $mensagem = "Esta Liga não existe";
        }
    } else {
        $mensagem = "Algo deu errado, tente novamente.";
    }
    mysqli_close($conn);
}
echo json_encode(["values" => $json, "message" => $mensagem]);
