// Save employee (add or update)
function saveStudent() {
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;

    // Simple validation
    if (!name || !course || !email) {
        alert('Please fill all fields');
        return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('id', id);//the first field is the id from the database
    formData.append('name', name);
    formData.append('course', course);
    formData.append('email', email);

    // Determine the URL based on add or update
    const url = id === '0' ? 'add_student.php' : 'update_student.php';

    // Send data to server
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            location.reload(); // Refresh the page to see changes
        })
        .catch(error => {
            console.error('Error:', error);
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