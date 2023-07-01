<?php
include "../authenticate.php";
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $league = $_GET['league'];
    $player = $_SESSION['id'];
    $erro_nameR;
    $idleague;
    $valid = false;
    $select = "SELECT * FROM league_player lp INNER JOIN league l on l.id = lp.league WHERE l.name = '$league' AND player = $player";
    $conn = mysqli_connect("localhost", "root", "4685", "KeyBattle");
    $result = mysqli_query($conn, $select);
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $valid = true;
            while ($row = mysqli_fetch_assoc($result)) {
                $idleague = $row['id'];
            }
        } else {
            $erro_nameR = "Você não pertence a essa liga";
        }
    }
    $json = ["valid" => $valid, "erro_nameR" => $erro_nameR, "idleague" => $idleague];
    echo json_encode($json);
}
