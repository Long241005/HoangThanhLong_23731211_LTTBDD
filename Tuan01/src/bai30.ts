class Student30 {
    constructor(public name: string) {}
  }
  class Teacher30 {
    constructor(public name: string) {}
  }
   
  class School30 {
    private students: Student30[] = [];
    private teachers: Teacher30[] = [];
   
    addStudent(student: Student30): void {
      this.students.push(student);
    }
   
    addTeacher(teacher: Teacher30): void {
      this.teachers.push(teacher);
    }
   
    displayInfo(): void {
      console.log("Học sinh:", this.students.map((s) => s.name));
      console.log("Giáo viên:", this.teachers.map((t) => t.name));
    }
  }
   
  const school30 = new School30();
  school30.addStudent(new Student30("Hoang Thanh Long"));
  school30.addStudent(new Student30("Nguyen Gia An"));
  school30.addStudent(new Student30("Le Nhat Tan"));
  school30.addTeacher(new Teacher30("Cô Lan"));
  school30.displayInfo();