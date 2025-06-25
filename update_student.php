<?php

include "connection.php";


$id = mysqli_real_escape_string($conn, $_POST['id']);
$name = mysqli_real_escape_string($conn, $_POST['name']);
$course = mysqli_real_escape_string($conn, $_POST['course']);
$email = mysqli_real_escape_string($conn, $_POST['email']);

$sql = "UPDATE students SET name='$name', course = '$course', email='$email' WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo "student updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
