<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "student_db";

$conn = mysqli_connect($host, $username, $password, $database);

if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}
