/**
 * Generates a random username with a timestamp to ensure uniqueness
 * @param prefix Optional prefix for the username
 * @returns A unique username string
 */
export function generateRandomUsername(prefix: string = 'user'): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `${prefix}_${timestamp}_${randomSuffix}`;
}

/**
 * Generates a random password with specified length
 * @param length Length of the password (default: 12)
 * @returns A random password string
 */
export function generateRandomPassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

/**
 * Generates a random user object with unique username and password
 * @returns A user object with random credentials
 */
export function generateRandomUser() {
    return {
        username: generateRandomUsername(),
        password: generateRandomPassword(),
        // Add any other user properties as needed
    };
}
