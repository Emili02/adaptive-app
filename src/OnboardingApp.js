import Employee from './models/Employee';
import Test from './models/Test';
import Course from './models/Course';
import DatabaseService from './services/DatabaseService';
import NotificationService from './services/NotificationService';

class OnboardingApp {
    constructor() {
        this.employees = [];
        this.interfaceSettings = {
            'vision_impaired': {
                fontSize: 'large',
                contrast: 'high',
                screenReader: true,
                colorScheme: 'highContrast',
                audioDescriptions: true
            },
            'hearing_impaired': {
                subtitles: true,
                visualCues: true,
                signLanguage: true,
                textTranscriptions: true
            },
            'mobility_impaired': {
                gestureControl: true,
                voiceControl: true,
                adaptiveInput: true,
                customKeyboardLayout: true
            }
        };
        this.mandatoryCourses = [
            new Course('Пожарная безопасность', 'safety'),
            new Course('Охрана труда', 'safety')
        ];
    }

    async addEmployee(employee) {
        this.employees.push(employee);
        await DatabaseService.saveEmployee(employee);
        this.conductInitialTest(employee);
        this.createEmployeeAccount(employee);
        NotificationService.notifyEmployer(employee.id, 'Новый сотрудник добавлен в систему');
    }

    async conductInitialTest(employee) {
        const test = new Test(employee.specialization);
        // Проведение тестирования
        employee.testResults = {
            knowledgeLevel: 0,
            ovzType: null,
            requiredAccommodations: []
        };
        await DatabaseService.updateEmployeeProgress(employee.id, employee.testResults);
    }

    createEmployeeAccount(employee) {
        employee.account = {
            login: this.generateLogin(employee),
            password: this.generatePassword(),
            courses: this.assignCourses(employee),
            progress: 0,
            interfaceSettings: this.personalizeInterface(employee),
            mandatoryCourses: this.mandatoryCourses,
            completedCourses: []
        };
    }

    personalizeInterface(employee) {
        const baseSettings = this.interfaceSettings[employee.ovzType] || {};
        return {
            ...baseSettings,
            customSettings: employee.testResults?.requiredAccommodations || []
        };
    }

    assignCourses(employee) {
        let courses = [
            new Course('О компании', 'theory'),
            new Course('Порядки', 'theory')
        ];
        
        if (employee.testResults.knowledgeLevel < 50) {
            courses.push(new Course('Базовый курс по специальности', 'theory'));
        }

        if (employee.ovzType === 'mobility_impaired') {
            courses.push(new Course('ВР тренировка: Отработка движений', 'vr'));
        } else if (employee.ovzType === 'vision_impaired') {
            courses.push(new Course('ВР тренировка: Ориентация в пространстве', 'vr'));
        }

        return courses;
    }

    generateLogin(employee) {
        return `${employee.firstName}.${employee.lastName}`.toLowerCase();
    }

    generatePassword() {
        return Math.random().toString(36).slice(-8);
    }

    async trackProgress(employee, course, progress) {
        employee.account.progress += progress;
        await DatabaseService.updateEmployeeProgress(employee.id, employee.account.progress);
        
        if (employee.account.progress >= 95) {
            this.allowToWork(employee);
        }
        
        NotificationService.notifyEmployer(
            employee.id,
            `Прогресс сотрудника ${employee.firstName} ${employee.lastName}: ${employee.account.progress}%`
        );
    }

    allowToWork(employee) {
        employee.allowedToWork = true;
        NotificationService.notifyEmployer(
            employee.id,
            `Сотрудник ${employee.firstName} ${employee.lastName} допущен к работе`
        );
    }

    completeOnboarding(employee) {
        if (employee.allowedToWork) {
            NotificationService.notifyEmployer(
                employee.id,
                `${employee.firstName} ${employee.lastName} завершил онбординг и приступил к работе`
            );
        }
    }
}

export default OnboardingApp; 