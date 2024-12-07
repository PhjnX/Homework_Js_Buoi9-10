import Employee from "../models/employee.js";
import EmployeeList from "../models/employee-list.js";
import Validation from "../models/validation.js";
// Tạo đối tượng mới từ class EmployeeList
const employeeList = new EmployeeList();

const validation = new Validation();

const getEleId = (id) => document.getElementById(id);

const getInfoEmployee = () => {
  const employeeAccount = getEleId("tknv").value.trim();
  const employeeFullname = getEleId("name").value.trim();
  const employeeEmail = getEleId("email").value.trim();
  const employeePassword = getEleId("password").value.trim();
  const employeeDate = getEleId("datepicker").value.trim();
  const employeeSalary = parseFloat(getEleId("luongCB").value.trim());
  const employeePosition = getEleId("chucvu").value.trim();
  const employeeTimeWork = parseFloat(getEleId("gioLam").value.trim());

  let isValid = true;

  const handleValidation = (field, value, validateMethod, errorId) => {
    console.log("Field:", field);
    console.log("Value:", value);

    const errorMessage = validateMethod(value);
    const errorField = getEleId(errorId);

    console.log("Error Message:", errorMessage); // Kiểm tra lỗi

    if (errorMessage) {
      errorField.innerHTML = errorMessage;
      errorField.style.display = "block";
      isValid = false;
    } else {
      errorField.innerHTML = "";
      errorField.style.display = "none";
    }
  };

  handleValidation(
    "account",
    employeeAccount,
    validation.checkAccount,
    "tbTKNV"
  );
  handleValidation(
    "fullname",
    employeeFullname,
    validation.checkFullname,
    "tbTen"
  );
  handleValidation("email", employeeEmail, validation.checkEmail, "tbEmail");
  handleValidation(
    "password",
    employeePassword,
    validation.checkPassword,
    "tbMatKhau"
  );
  handleValidation("date", employeeDate, validation.checkDate, "tbNgay");
  handleValidation(
    "salary",
    employeeSalary,
    validation.checkSalary,
    "tbLuongCB"
  );
  handleValidation(
    "position",
    employeePosition,
    validation.checkPosition,
    "tbChucVu"
  );
  handleValidation(
    "timeWork",
    employeeTimeWork,
    validation.checkTimeWork,
    "tbGiolam"
  );

  if (!isValid) return null;

  // Tạo đối tượng Employee
  const employee = new Employee(
    employeeAccount,
    employeeFullname,
    employeeEmail,
    employeePassword,
    employeeDate,
    employeeSalary,
    employeePosition,
    employeeTimeWork
  );

  // Tính tổng lương
  employee.calcSalaryTotal();

  // Xếp loại nhân viên
  employee.calcEmployeeType();

  // Trả về đối tượng nhân viên
  return employee;
};

/**
 * Render danh sách nhân viên lên UI
 */

const renderEmployeeList = (data) => {
  console.log(data);
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    content += `
      <tr>
        <td>${employee.account}</td>
        <td>${employee.fullname}</td>
        <td>${employee.email}</td>
        <td>${employee.date}</td>
        <td>${employee.position}</td>
        <td>${employee.salaryTotal}</td>
        <td>${employee.employeeType}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditEmployee('${employee.account}')">Edit</button>
          <button class="btn btn-danger" onclick="handleDeleteEmployee('${employee.account}')">Delete</button>
        </td> 
      </tr>
      `;
  }

  getEleId("tableDanhSach").innerHTML = content;
};

getEleId("btnThem").onclick = function () {
  getEleId("header-title").innerHTML = "Add New Employee";
  getEleId("btnThemNV").style.display = "inline-block";
  getEleId("btnCapNhat").style.display = "none";
  getEleId("employeeForm").reset();
  getEleId("tknv").setAttribute("disabled");
};

/**
 * Handle Edit Employee
 */
const handleEditEmployee = (account) => {
  getEleId("header-title").innerHTML = "Update Employee";
  getEleId("btnCapNhat").style.display = "inline-block";
  getEleId("btnThemNV").style.display = "none";
  const employee = employeeList.editEmployee(account);
  if (account) {
    getEleId("tknv").setAttribute("disabled", true);
    getEleId("tknv").value = employee.account;
    getEleId("name").value = employee.fullname;
    getEleId("email").value = employee.email;
    getEleId("password").value = employee.password;
    getEleId("datepicker").value = employee.date;
    getEleId("luongCB").value = employee.salary;
    getEleId("chucvu").value = employee.position;
    getEleId("gioLam").value = employee.timework;
  }
};
window.handleEditEmployee = handleEditEmployee;

/**
 * Handle Delete Employee
 */
const handleDeleteEmployee = (account) => {
  employeeList.removeEmployee(account);
  renderEmployeeList(employeeList.arr);
  setLocalStorage();
};
window.handleDeleteEmployee = handleDeleteEmployee;

/**
 * Set Local Storage
 */
const setLocalStorage = () => {
  const dataJSON = employeeList.arr;
  const dataString = JSON.stringify(dataJSON);
  localStorage.setItem("EMPLOYEE_LIST", dataString);
  console.log("LocalStorage set: ", dataString); // Xem dữ liệu đã được lưu vào localStorage hay chưa
};

/**
 * Get Local Storage
 */
const getLocalStorage = () => {
  const dataString = localStorage.getItem("EMPLOYEE_LIST");
  if (!dataString) return;
  const dataJSON = JSON.parse(dataString);
  employeeList.arr = dataJSON;
  renderEmployeeList(employeeList.arr);
};
getLocalStorage();

/**
 * Thêm nhân viên
 */

getEleId("btnThemNV").onclick = function () {
  const employee = getInfoEmployee();
  console.log(employee); // Kiểm tra xem đối tượng nhân viên có được tạo hay không

  if (employee === null) {
    console.log("Validation failed. No employee added.");
    return;
  }

  // Thêm nhân viên vào danh sách nhân viên
  employeeList.addEmployee(employee);
  // Render danh sách nhân viên
  renderEmployeeList(employeeList.arr);
  // Set Local Storage
  setLocalStorage();
  // Đóng form
  getEleId("btnDong").click();
};

/**
 * Update Employee
 */
getEleId("btnCapNhat").onclick = function () {
  const employee = getInfoEmployee();
  employeeList.updateEmployee(employee);
  // Render danh sách nhân viên
  renderEmployeeList(employeeList.arr);
  // Set Local Storage
  setLocalStorage();
  // Đóng form
  getEleId("btnDong").click();
};

/**
 * Search Employee
 */
getEleId("searchName").addEventListener("keyup", function () {
  const keyword = getEleId("searchName").value;
  const employeeSearch = employeeList.searchEmployee(keyword);
  renderEmployeeList(employeeSearch);
});
