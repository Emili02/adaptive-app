class Employee {
    constructor(firstName, lastName, ovzType = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ovzType = ovzType; // 'vision_impaired', 'hearing_impaired', 'mobility_impaired' или null
        this.allowedToWork = false;
        this.testResults = null;
        this.id = this.generateEmployeeId();
    }

    generateEmployeeId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

export default Employee; 