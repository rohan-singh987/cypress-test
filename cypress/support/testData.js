// Test data generation utilities
export const generateTestData = () => {
    return {
        botName: `Test Bot ${Date.now()}`,
        templateId: 'r1DYYe',
        userDetails: {
            firstName: `TestUser${Date.now()}`,
            lastName: 'Automation',
            email: `test${Date.now()}@example.com`,
            password: 'TestPass123!'
        },
        botConfigs: {
            welcomeMessage: 'Welcome to test bot!',
            description: 'This is a test bot description',
            tags: ['test', 'automation'],
            language: 'English'
        },
        testMessages: [
            'Hello',
            'How are you?',
            'What services do you offer?'
        ]
    };
};

// Cleanup utilities
export const cleanupTestData = (testData) => {
    // Delete created bot
    cy.deleteTestBot(testData.botName);
    
    // Clear any stored data
    cy.clearLocalStorage();
    cy.clearCookies();
};

// Test data validators
export const validateTestData = (testData) => {
    expect(testData).to.have.property('botName');
    expect(testData).to.have.property('userDetails');
    expect(testData.userDetails).to.have.property('email');
};

// Generate random data utilities
export const generateRandomString = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

export const generateRandomEmail = () => {
    return `test_${generateRandomString()}@example.com`;
}; 