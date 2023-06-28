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
    $query = $select + $where;
    mysqli_close($conn);
}
