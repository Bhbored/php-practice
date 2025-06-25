// Save employee (add or update)
function saveStudent() {
    const formData = new FormData(document.getElementById('studentForm'));

    fetch('save_student.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data.includes("success")) location.reload();
        })
        .catch(error => alert("Error: " + error));
}
function editStudent(id) {
    fetch('get_student.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('studentId').value = data.id;
            document.getElementById('name').value = data.name;
            document.getElementById('course').value = data.course;
            document.getElementById('email').value = data.email;
        });
}

// Delete employee
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch('delete_student.php?id=' + id)
            .then(response => response.text())
            .then(data => {
                alert(data);
                location.reload(); // Refresh the page to see changes
            });
    }
}