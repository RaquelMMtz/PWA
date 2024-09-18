
let students = JSON.parse(localStorage.getItem('students')) || [];


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

   
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteStudent);
    });
}


function deleteStudent(event) {
    const index = event.target.getAttribute('data-index');
    students.splice(index, 1); 
    localStorage.setItem('students', JSON.stringify(students)); 
    displayStudents(); 
}


document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const name = document.getElementById('name').value;
    const semester = document.getElementById('semester').value;
    const subject1 = document.getElementById('subject1').value;
    const subject2 = document.getElementById('subject2').value;
    const subject3 = document.getElementById('subject3').value;

   
    const newStudent = { name, semester, subject1, subject2, subject3 };

   
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    
    document.getElementById('student-form').reset();

    
    displayStudents();
});


window.onload = displayStudents;
