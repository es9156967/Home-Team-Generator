const Employee = require("./Employee");

class Engineer extends Employee  {
    constructor(ID, name, email, github) {
        super(ID, name, email, 'Engineer');
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}
 
module.exports = Engineer;