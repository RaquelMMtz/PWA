// Verificar si ya hay datos en localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Función para mostrar los datos de los estudiantes
function displayStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Limpiar la lista antes de mostrar

    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Nombre:</strong> ${student.name}<br>
            <strong>Semestre:</strong> ${student.semester}<br>
            <strong>Materias:</strong> ${student.subject1}, ${student.subject2}, ${student.subject3}
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
        studentList.appendChild(li);
    });

    // Añadir los eventos de eliminar a cada botón
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteStudent);
    });
}

// Función para eliminar un estudiante
function deleteStudent(event) {
    const index = event.target.getAttribute('data-index');
    students.splice(index, 1); // Eliminar el estudiante del array
    localStorage.setItem('students', JSON.stringify(students)); // Actualizar localStorage
    displayStudents(); // Actualizar la lista
}

// Guardar datos del alumno al enviar el formulario
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recargar la página

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const semester = document.getElementById('semester').value;
    const subject1 = document.getElementById('subject1').value;
    const subject2 = document.getElementById('subject2').value;
    const subject3 = document.getElementById('subject3').value;

    // Crear un objeto para el nuevo estudiante
    const newStudent = { name, semester, subject1, subject2, subject3 };

    // Añadir el nuevo estudiante al array y guardarlo en localStorage
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Limpiar el formulario
    document.getElementById('student-form').reset();

    // Mostrar los datos actualizados
    displayStudents();
});

// Mostrar los estudiantes guardados al cargar la página
window.onload = displayStudents;
