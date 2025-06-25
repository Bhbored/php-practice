<?php
include "connection.php";

// Get all form data
$id = $_POST['id'] ?? 0;
$name = $conn->real_escape_string($_POST['name'] ?? '');
$course = $conn->real_escape_string($_POST['course'] ?? '');
$email = $conn->real_escape_string($_POST['email'] ?? '');

// Validate inputs
if (empty($name) || empty($course) || empty($email)) {
    die("Error: All fields are required");
}

// Determine if insert or update
if ($id == 0) {
    $sql = "INSERT INTO students (name, course, email) VALUES ('$name', '$course', '$email')";
    $message = "added";
} else {
    $sql = "UPDATE students SET name='$name', course='$course', email='$email' WHERE id=$id";
    $message = "updated";
}

// Execute query
if ($conn->query($sql)) {
    echo "Student {$message} successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
