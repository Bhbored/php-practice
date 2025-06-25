// Show a message using alert
function showMessage(msg) {
    alert(msg);
}

// Clear the form and reset to add mode
function resetForm() {
    $('#studentForm')[0].reset();
    $('#id').val(0);
    $('#saveBtn').text('Save Student');
}

// Reload the page to update the table
function refreshTable() {
    location.reload();
}

// Save or update a student
function saveStudent() {
    var id = $('#id').val();
    var name = $('[name="name"]').val();
    var course = $('[name="course"]').val();
    var email = $('[name="email"]').val();

    $.post('save_student.php', {
        id: id,
        name: name,
        course: course,
        email: email
    }, function (data) {
        var result = typeof data === 'object' ? data : JSON.parse(data);
        showMessage(result.message);
        if (result.success) {
            resetForm();
            refreshTable();
        }
    });
}

// Edit student: fill the form with student data
function editStudent(id) {
    $.get('get_student.php', { id: id }, function (data) {
        var result = typeof data === 'object' ? data : JSON.parse(data);
        if (result.success) {
            $('#id').val(result.student.id);
            $('[name="name"]').val(result.student.name);
            $('[name="course"]').val(result.student.course);
            $('[name="email"]').val(result.student.email);
            $('#saveBtn').text('Update Student');
        } else {
            showMessage(result.message);
        }
    });
}

// Delete a student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        $.get('delete_student.php', { id: id }, function (data) {
            var result = typeof data === 'object' ? data : JSON.parse(data);
            showMessage(result.message);
            if (result.success) {
                refreshTable();
                resetForm();
            }
        });
    }
}