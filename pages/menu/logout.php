<?php
include "../authenticate.php";
if ($_SERVER["REQUEST_METHOD" == "GET"]) {
    session_unset();
    session_destroy();
}
