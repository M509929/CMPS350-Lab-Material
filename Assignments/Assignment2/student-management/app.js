import promptSync from "prompt-sync";
const prompt = promptSync();


const Students = []; 
function getStudents() {
    

    for (let i = 0; i < 5; i++) { 
        let name = prompt(`Enter the name of student ${i + 1}: `); 
        let gender = prompt(`Enter the gender of student ${i + 1}: `); 
        let age = Math.floor(Math.random() * (35 - 17 + 1)) + 17;
        let grade = Math.floor(Math.random() * 101);
       const Student_obj={  "name:",name, gender, age, grade };
       Students.push(Student_obj);
    }

    return Students; 
}


const students = getStudents();
console.log("Student List:", students);

function youngest(students){
    let min_age=Math.min(...students.map(s =>s.age));
    let youngest_students = students.filter(s => s.age === min_age);
    return youngest_students;

}
console.log("The youngest student(s): ", youngest(students));


function Oldest(students){
    let Max_age=Math.max(...students.map(s =>s.age));
    let Oldest_students = students.filter(s => s.age === Max_age);
    return Oldest_students;

}
console.log("The oldest student(s): ",Oldest(students));


function average_age(students){
    let total_age=students.map(s=>s.age).reduce((sum, age) => sum + age, 0);
    return total_age / students.length;
}
console.log("Thw average ages is:",average_age(students))


function Median_age(){
    let sortedStudents = Students.sort((a, b) => a.age - b.age);
    const numberOfStudents = sortedStudents.length;
    if(sortedStudents.length%2==0){
        return [sortedStudents[numberOfStudents / 2 - 1].age, sortedStudents[numberOfStudents / 2].age]
            .reduce((a, b) => a + b) / 2;
        }else{
            const mid = Math.floor(numberOfStudents / 2);
            return sortedStudents[mid].age;
        }
}
console.log("The meddian age is:",Median_age());


function Mean_grades(){
    const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
    const meanGrades = totalGrades / students.length;
    return meanGrades;
}
console.log("The mean of the grades is",Mean_grades());



function Variance_grades(students) {
    const mean = Mean_grades(students);  
    const variance = students.reduce((sum, student) => sum + Math.pow(student.grade - mean, 2), 0);
    return variance / students.length;
}
console.log("The Variance of the grades is", Variance_grades(students

));



function getStudent_byGender(gender){
    const lowerCaseGender = gender.toLowerCase();
    return students.filter(student => student.gender.toLowerCase() === lowerCaseGender);
}
console.log("Male Students:", getStudent_byGender("Male"));
console.log("Female Students:", getStudent_byGender("Female"));



function Order_Names(students){
    let Student_name=Students.sort((a, b) => a.name.localeCompare(b.name));
    return Student_name;
}
console.log("Students name sorted ", Order_Names(students));



function Order_grades(students){
    let Student_sort_by_grades=Students.sort((a, b) => b.grade - a.grade);
    return Student_sort_by_grades;
}
console.log("Students grades sorted in desending", Order_grades(students));


function Fail_students(students){
    const fail=students.filter(s=>
        s.grade<60);
    return fail;
}
console.log("students with failing grades ", Fail_students(students));


function Highest_female_grade(students) {
    const femaleStudents = students.filter(s => s.gender.toLowerCase() === 'female');
    const maxGrade = Math.max(...femaleStudents.map(s => s.grade));
    const highestGradeFemale = femaleStudents.find(s => s.grade === maxGrade);
    return highestGradeFemale;
}
console.log("The highset female grade: ",Highest_female_grade(students));


function avg_students_male(students) {
    const maleStudents = students.filter(s => s.gender.toLowerCase() === 'male');
    const totalGrade = maleStudents.reduce((sum, student) => sum + student.grade, 0);
    return totalGrade / maleStudents.length;
}
console.log("The average grade for the male is : ",avg_students_male(students))



function Status(students){
    return students.map(s => ({...s, passing: s.grade >= 60 }))

}
console.log("Student Information with Passing Status:", Status(students));