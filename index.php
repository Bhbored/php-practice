<?php

include "connection.php";

if (mysqli_connect_errno()) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>

<body>
    <div class="container mt-5">
        <!-- important to have this div for displaying messages -->
        <div id="message"></div>
        <h1>List Of Students from DB</h1>
        <div class="table-responsive">
            <table class="table table-bordered" id="studentsTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $result = mysqli_query($conn, "SELECT * FROM students");
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>
                    <td>{$row['name']}</td>
                    <td>{$row['course']}</td>
                    <td>{$row['email']}</td>
                    <td>
                        <button class='btn btn-warning' onclick='editStudent({$row['id']})'>Edit</button>
                        <button class='btn btn-danger' onclick='deleteStudent({$row['id']})'>Delete</button>
                    </td>
                </tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
        <h1>Add new Student</h1>
        <form id="studentForm">
            <input type="hidden" name="id" id="id" value="0">

            <div class="mb-2 d-flex align-items-center">
                <label class="form-label mb-0 me-1" style="width:70px">Name:</label>
                <input type="text" class="form-control form-control-sm" style="width:200px" name="name" required>
            </div>

            <div class="mb-2 d-flex align-items-center">
                <label class="form-label mb-0 me-1" style="width:70px">Course:</label>
                <input type="text" class="form-control form-control-sm" style="width:200px" name="course" required>
            </div>

            <div class="mb-2 d-flex align-items-center">
                <label class="form-label mb-0 me-1" style="width:70px">Email:</label>
                <input type="email" class="form-control form-control-sm" style="width:200px" name="email" required>
            </div>

            <button type="button" class="btn btn-primary" id="saveBtn" onclick="saveStudent()">Save Student</button>
        </form>
    </div>
    <script src="main.js?v=<?= time() ?>"></script>
</body>

</html>