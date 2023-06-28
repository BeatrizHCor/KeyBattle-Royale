<?php
session_start();
$login;

if (isset($_SESSION["username"]) && isset($_SESSION["id"])) {
    $login = true;
} else {
    $login = false;
}
