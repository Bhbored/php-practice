<?php
include "connection.php";

$id = mysqli_real_escape_string($conn, $_GET['id']);
$sql = "DELETE FROM students WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo "student deleted successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
