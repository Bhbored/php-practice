<?php
include "connection.php";

header('Content-Type: application/json');

$id = mysqli_real_escape_string($conn, $_GET['id']);
$sql = "DELETE FROM students WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Student deleted successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conn)]);
}

mysqli_close($conn);
