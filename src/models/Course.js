class Course {
    constructor(name, type, requirements = {}) {
        this.name = name;
        this.type = type; // 'theory', 'vr', 'safety'
        this.requirements = requirements;
        this.content = this.loadContent();
    }

    loadContent() {
        // В реальном приложении загрузка контента из БД
        return {
            modules: [],
            duration: 0,
            materials: []
        };
    }
}

export default Course; 