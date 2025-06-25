<?php
include "connection.php";

header('Content-Type: application/json');

$id = mysqli_real_escape_string($conn, $_GET['id']);
$sql = "SELECT * FROM students WHERE id = $id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["success" => true, "student" => mysqli_fetch_assoc($result)]);
} else {
    echo json_encode(["success" => false, "message" => "Student not found."]);
}

mysqli_close($conn);
