class VRTrainingService {
    constructor() {
        this.sessions = new Map();
    }

    createSession(employeeId, trainingType) {
        const session = {
            id: Date.now(),
            employeeId,
            trainingType,
            startTime: new Date(),
            progress: 0,
            completed: false
        };
        this.sessions.set(session.id, session);
        return session;
    }

    updateProgress(sessionId, progress) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.progress = progress;
            if (progress >= 100) {
                session.completed = true;
            }
        }
    }

    getEmployeeSessions(employeeId) {
        return Array.from(this.sessions.values())
            .filter(session => session.employeeId === employeeId);
    }
}

export default new VRTrainingService(); 