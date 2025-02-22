
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OnboardingApp from './OnboardingApp';
import Employee from './models/Employee';

// Пример использования
const onboardingApp = new OnboardingApp();

async function main() {
    const employee = new Employee('Иван', 'Иванов', 'vision_impaired');
    await onboardingApp.addEmployee(employee);
    
    // Имитация прохождения курсов
    await onboardingApp.trackProgress(employee, 'О компании', 50);
    await onboardingApp.trackProgress(employee, 'Порядки', 50);
    onboardingApp.completeOnboarding(employee);
}

main().catch(console.error);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);