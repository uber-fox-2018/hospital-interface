class Employee {
    constructor(position, username, password) {
        this.id = 0
        this.position = position
        this.username = username
        this.password = password
        this.isLogin = false;
    }
}

module.exports = Employee;