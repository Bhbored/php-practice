<?php
include "connection.php";

header('Content-Type: application/json');

// Get all form data
$id = $_POST['id'] ?? 0;
$name = $conn->real_escape_string($_POST['name'] ?? '');
$course = $conn->real_escape_string($_POST['course'] ?? '');
$email = $conn->real_escape_string($_POST['email'] ?? '');

// Validate inputs
if (empty($name) || empty($course) || empty($email)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Determine if insert or update
if ($id == 0) {
    $sql = "INSERT INTO students (name, course, email) VALUES ('$name', '$course', '$email')";
    $message = "Student added successfully!";
} else {
    $sql = "UPDATE students SET name='$name', course='$course', email='$email' WHERE id=$id";
    $message = "Student updated successfully!";
}

// Execute query
if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => $message]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
