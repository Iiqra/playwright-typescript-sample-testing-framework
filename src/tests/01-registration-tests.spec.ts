import { test, expect } from '../fixtures/test-context';
import { generateRandomUser } from '../utils/random-user';

test.describe('Authentication Tests', () => {

    test('should display login modal when clicking login button', async ({ page, homePage, loginPage }) => {
        // Click login button
        await homePage.clickLogin();
        
        // Verify login modal is visible
        await loginPage.verifyLoginModalVisible();
        
        // Close the modal
        await page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close').click();

    });

    test('should handle data-driven registration', async ({ page, homePage }) => {
        // Generate 2 random users for testing
        const testUsers = Array(2).fill(null).map(() => generateRandomUser());
        
        for (const user of testUsers) {
            // Set up dialog handler for the alert
            const dialogPromise = page.waitForEvent('dialog');
            
            // Click signup and fill the form
            await homePage.clickSignUp();
            await page.fill('#sign-username', user.username);
            await page.fill('#sign-password', user.password);
            
            // Log the credentials for debugging
            console.log(`Attempting to register user: ${user.username}`);
            
            // Click the signup button and wait for the dialog
            await page.click('button:has-text("Sign up")');
            
            try {
                // Handle the alert with a timeout
                const dialog = await Promise.race([
                    dialogPromise,
                    page.waitForTimeout(5000).then(() => { 
                        throw new Error('Dialog did not appear within 5 seconds'); 
                    })
                ]);
                
                const message = dialog.message();
                console.log(`Registration response: ${message}`);
                
                // Verify the success message
                expect(message).toMatch(/Sign up successful|This user already exist/);
                await dialog.accept();
                
            } catch (error) {
                console.error('Error during registration:', error);
                // Take a screenshot on error
                await page.screenshot({ path: `test-results/registration-error-${Date.now()}.png` });
                throw error;
            } finally {
                // Always try to close the modal
                try {
                    await page.click('button[data-dismiss="modal"]', { timeout: 2000 });
                } catch {
                    // Modal might already be closed
                }
                await page.waitForTimeout(1000); // Small delay between tests
            }
        }
    });    
});
