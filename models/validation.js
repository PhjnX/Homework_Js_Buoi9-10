export default class Validation {
  // Kiểm tra tài khoản
  checkAccount(account) {
    const regex = /^[a-zA-Z0-9]{4,6}$/;
    if (!regex.test(account)) {
      return "Tài khoản phải có từ 4 đến 6 ký tự!";
    }
    return "";
  }

  // Kiểm tra tên nhân viên
  checkFullname(fullname) {
    if (
      !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưĂắặẽễếềệìíĩợỡ ]+$/.test(
        fullname
      )
    ) {
      return "Tên nhân viên chỉ chứa chữ, không để trống!";
    }
    return "";
  }

  // Kiểm tra email
  checkEmail(email) {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "Email không đúng định dạng!";
    }
    return "";
  }

  // Kiểm tra mật khẩu
  checkPassword(password) {
    if (!password) {
      return "Mật khẩu không được để trống!";
    }
    if (password.length < 6 || password.length > 10) {
      return "Mật khẩu phải từ 6 đến 10 ký tự!";
    }
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      return "Mật khẩu phải chứa ít nhất 1 ký tự số!";
    }
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return "Mật khẩu phải chứa ít nhất 1 ký tự in hoa!";
    }
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    if (!hasSpecialChar) {
      return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)!";
    }
    return "";
  }

  // Kiểm tra ngày làm
  checkDate(date) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      return "Vui lòng chọn ngày làm!";
    }
    return "";
  }

  // Kiểm tra lương cơ bản
  checkSalary(salary) {
    if (isNaN(salary) || salary < 1000000 || salary > 20000000) {
      return "Vui lòng nhập lương (1.000.000 -> 20.000.000";
    }
    return "";
  }

  // Kiểm tra chức vụ
  checkPosition(position) {
    const validPositions = ["Sếp", "Trưởng phòng", "Nhân viên"];
    if (!validPositions.includes(position)) {
      return "Vui lòng chọn chức vụ!";
    }
    return "";
  }

  // Kiểm tra giờ làm
  checkTimeWork(timeWork) {
    if (isNaN(timeWork) || timeWork < 80 || timeWork > 200) {
      return "Vui lòng nhập số giờ làm, số giờ làm phải từ 80 đến 200 giờ!";
    }
    return "";
  }
}
