class NotificationService {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(employeeId, callback) {
        this.subscribers.set(employeeId, callback);
    }

    notify(employeeId, message) {
        const callback = this.subscribers.get(employeeId);
        if (callback) {
            callback(message);
        }
    }

    notifyEmployer(employeeId, message) {
        // Отправка уведомления работодателю
    }
}

export default new NotificationService(); 