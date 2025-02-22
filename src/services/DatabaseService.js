import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

class DatabaseService {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });
        this.init();
    }

    async init() {
        try {
            await this.createTables();
            console.log('База данных успешно инициализирована');
        } catch (error) {
            console.error('Ошибка инициализации БД:', error);
            process.exit(1);
        }
    }

    async createTables() {
        const client = await this.pool.connect();
        try {
            await client.query(`
                CREATE TABLE IF NOT EXISTS employees (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    ovz_type VARCHAR(50),
                    allowed_to_work BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS test_results (
                    id SERIAL PRIMARY KEY,
                    employee_id INTEGER REFERENCES employees(id),
                    knowledge_level INTEGER,
                    ovz_type VARCHAR(50),
                    recommendations JSONB,
                    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS courses (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(200),
                    type VARCHAR(50),
                    requirements JSONB
                );

                CREATE TABLE IF NOT EXISTS employee_progress (
                    id SERIAL PRIMARY KEY,
                    employee_id INTEGER REFERENCES employees(id),
                    course_id INTEGER REFERENCES courses(id),
                    progress INTEGER DEFAULT 0,
                    completed BOOLEAN DEFAULT FALSE,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
        } finally {
            client.release();
        }
    }

    async saveEmployee(employee) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO employees (first_name, last_name, ovz_type) VALUES ($1, $2, $3) RETURNING id',
                [employee.firstName, employee.lastName, employee.ovzType]
            );
            return result.rows[0].id;
        } finally {
            client.release();
        }
    }

    async updateEmployeeProgress(employeeId, courseId, progress) {
        const client = await this.pool.connect();
        try {
            await client.query(
                `INSERT INTO employee_progress (employee_id, course_id, progress)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (employee_id, course_id)
                 DO UPDATE SET progress = $3, last_updated = CURRENT_TIMESTAMP`,
                [employeeId, courseId, progress]
            );
        } finally {
            client.release();
        }
    }

    async getEmployeeData(employeeId) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT e.*, 
                        json_agg(DISTINCT tr.*) as test_results,
                        json_agg(DISTINCT ep.*) as progress
                 FROM employees e
                 LEFT JOIN test_results tr ON tr.employee_id = e.id
                 LEFT JOIN employee_progress ep ON ep.employee_id = e.id
                 WHERE e.id = $1
                 GROUP BY e.id`,
                [employeeId]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}

export default new DatabaseService(); 