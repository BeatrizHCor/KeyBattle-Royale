<?php
require "pages/authenticate.php";

if (isset($_SESSION["username"]) && isset($_SESSION["id"])) {
    header("Location: /pages/menu/menu.html", TRUE, 301);
} else {
    header("Location: /pages/home/home.html", TRUE, 301);
}
