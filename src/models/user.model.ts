export interface User {
    username: string;
    password: string;
    exists?: boolean; // For test data to indicate if user exists
}

export const testUsers: User[] = [
    { username: 'testuser1', password: 'Test123!', exists: false },
    { username: 'demouser1', password: 'Demo123!', exists: true },
    { username: 'playwright_user', password: 'Play123!', exists: false },
    { username: 'automation_test', password: 'Auto123!', exists: false },
    { username: 'e2e_user', password: 'E2e123!', exists: false }
];
