<?php
include "connection.php";

$id = mysqli_real_escape_string($conn, $_POST['id']);
$name = mysqli_real_escape_string($conn, $_POST['name']);
$course = mysqli_real_escape_string($conn, $_POST['course']);
$email = mysqli_real_escape_string($conn, $_POST['email']);

$sql = "INSERT INTO employees (name, course, email) VALUES ('$name', '$course', '$email')";

if (mysqli_query($conn, $sql)) {
    echo "student added successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
