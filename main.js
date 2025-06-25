alert('main.js loaded');

// Save employee (add or update)
function showMessage(msg, isSuccess = true) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class='alert alert-${isSuccess ? 'success' : 'danger'}'>${msg}</div>`;
    setTimeout(() => { messageDiv.innerHTML = ''; }, 3000);
}

function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('id').value = 0;
    document.getElementById('saveBtn').textContent = 'Save Student';
}

function refreshTable() {
    console.log('refreshTable called');
    fetch(window.location.href)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newTbody = doc.querySelector('#studentsTable tbody');
            document.querySelector('#studentsTable tbody').innerHTML = newTbody.innerHTML;
        })
        .catch(err => {
            showMessage('Failed to refresh table: ' + err, false);
            location.reload(); // fallback
        });
}

function saveStudent() {
    console.log('saveStudent called');
    const form = document.getElementById('studentForm');
    const formData = new FormData(form);
    document.getElementById('saveBtn').disabled = true;
    fetch('save_student.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.success);
            if (data.success) {
                resetForm();
                refreshTable();
            }
        })
        .catch(error => {
            showMessage('Operation failed: ' + error.message, false);
        })
        .finally(() => {
            document.getElementById('saveBtn').disabled = false;
        });
}

// Edit student: populate the form with student data
function editStudent(id) {
    console.log('editStudent called with id', id);
    fetch('get_student.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('id').value = data.student.id;
                document.querySelector('[name="name"]').value = data.student.name;
                document.querySelector('[name="course"]').value = data.student.course;
                document.querySelector('[name="email"]').value = data.student.email;
                document.getElementById('saveBtn').textContent = 'Update Student';
            } else {
                showMessage(data.message, false);
            }
        })
        .catch(error => {
            showMessage('Failed to fetch student data', false);
        });
}

// Delete employee
function deleteStudent(id) {
    console.log('deleteStudent called with id', id);
    if (confirm('Are you sure you want to delete this student?')) {
        fetch('delete_student.php?id=' + id)
            .then(response => response.json())
            .then(data => {
                showMessage(data.message, data.success);
                if (data.success) {
                    refreshTable();
                    resetForm();
                }
            })
            .catch(() => {
                showMessage('Failed to delete student', false);
            });
    }
}