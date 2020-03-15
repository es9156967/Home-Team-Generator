const Employee = require("./Employee");

class Manager extends Employee  {
    constructor(ID, name, email, officenum) {
        super(ID, name, email, 'Manager');
        this.officenum = officenum;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officenum;
    }
}
 
module.exports = Manager;