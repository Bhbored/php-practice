// Save employee (add or update)
function saveStudent() {
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;

    if (!name || !course || !email) {
        alert('Please fill all fields');
        return;
    }

    // Send as JSON instead of FormData
    const data = {
        id: id,
        name: name,
        course: course,
        email: email
    };

    // Single endpoint handling both operations
    fetch('save_student.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Operation failed');
        });
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