<?php
include "connection.php";

$id = $_POST['id'] ?? 0;
$name = mysqli_real_escape_string($conn, $_POST['name']);
$course = mysqli_real_escape_string($conn, $_POST['course']);
$email = mysqli_real_escape_string($conn, $_POST['email']);

if ($id == 0) {
    // Insert new
    $sql = "INSERT INTO students (name, course, email) VALUES ('$name', '$course', '$email')";
    $success = "added";
} else {
    // Update existing
    $sql = "UPDATE students SET name='$name', course='$course', email='$email' WHERE id=$id";
    $success = "updated";
}

if (mysqli_query($conn, $sql)) {
    echo "Student $success successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
