interface TestConfig {
    baseUrl: string;
    users: {
        standard: {
            username: string;
            password: string;
        };
    };
    timeouts: {
        short: number;
        medium: number;
        long: number;
    };
}

export const testConfig: TestConfig = {
    baseUrl: 'https://www.demoblaze.com/',
    users: {
        standard: {
            username: process.env.TEST_USERNAME || 'testuser',
            password: process.env.TEST_PASSWORD || 'testpass'
        }
    },
    timeouts: {
        short: 5000,
        medium: 10000,
        long: 30000
    }
};
