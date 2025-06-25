<?php
include "connection.php";

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Sanitize inputs
$id = mysqli_real_escape_string($conn, $data['id'] ?? 0);
$name = mysqli_real_escape_string($conn, $data['name']);
$course = mysqli_real_escape_string($conn, $data['course']);
$email = mysqli_real_escape_string($conn, $data['email']);

// Determine if insert or update
if ($id == 0) {
    $sql = "INSERT INTO students (name, course, email) VALUES ('$name', '$course', '$email')";
} else {
    $sql = "UPDATE students SET name='$name', course='$course', email='$email' WHERE id=$id";
}

// Execute query
if (mysqli_query($conn, $sql)) {
    echo $id == 0 ? "Student added successfully" : "Student updated successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
