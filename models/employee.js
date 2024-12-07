class Employee {
  constructor(
    _account,
    _fullname,
    _email,
    _password,
    _date,
    _salary,
    _position,
    _timework
  ) {
    this.account = _account;
    this.fullname = _fullname; 
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.salary = _salary;
    this.position = _position;
    this.timework = _timework;
    this.salaryTotal = 0;
    this.employeeType = ""; 
  }

  calcSalaryTotal() {
    if (this.position === "Sếp") {
      this.salaryTotal = this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      this.salaryTotal = this.salary * 2;
    } else if (this.position === "Nhân viên") {
      this.salaryTotal = this.salary;
    } else {
      this.salaryTotal = 0;
    }
    return this.salaryTotal;
  }

  calcEmployeeType() {
    if (this.timework >= 192) {
      this.employeeType = "Xuất sắc";
    } else if (this.timework >= 176) {
      this.employeeType = "Giỏi";
    } else if (this.timework >= 160) {
      this.employeeType = "Khá";
    } else {
      this.employeeType = "Trung bình";
    }
    return this.employeeType;
  }
}

export default Employee;
