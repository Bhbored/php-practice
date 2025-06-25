// Save employee (add or update)
function saveStudent() {
    const form = document.getElementById('studentForm');
    const formData = new FormData(form);

    fetch('save_student.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            alert(data);
            if (data.includes("success")) {
                location.reload(); // Refresh to show changes
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Operation failed: ' + error.message);
        });
}

// Edit student: populate the form with student data
function editStudent(id) {
    fetch('get_student.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id').value = data.id;
            document.querySelector('[name="name"]').value = data.name;
            document.querySelector('[name="course"]').value = data.course;
            document.querySelector('[name="email"]').value = data.email;
        })
        .catch(error => {
            alert('Failed to fetch student data');
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