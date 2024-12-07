class EmployeeList {
  constructor() {
    this.arr = [];
  }
  addEmployee(employee) {
    if (employee) {
      this.arr.push(employee);
    }
  }

  findIndexEmployee(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      if (employee.account === account) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeEmployee(account) {
    const index = this.findIndexEmployee(account);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }
  editEmployee(account) {
    const index = this.findIndexEmployee(account);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  }
  updateEmployee(employee) {
    const index = this.findIndexEmployee(employee.account);

    if (index !== -1) {
      this.arr[index] = employee;
    }
  }
  searchEmployee(keyword) {
    let result = [];
    const keywordLowerCase = keyword.toLowerCase();

    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      const employeeTypeLowerCase = employee.employeeType.toLowerCase();

      if (employeeTypeLowerCase.startsWith(keywordLowerCase)) {
        result.push(employee);
      }
    }
    return result;
  }
}

export default EmployeeList;
