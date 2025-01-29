// cypress/support/commands.js
Cypress.Commands.add("CheckLogin", (email, password) => {
    if (!email || !password) {
        throw new Error('Login credentials are missing. Make sure loginCredentials fixture is loaded.');
    }

    cy.visit("/");
    cy.url().then((currentUrl) => {
        if (!currentUrl.includes("/home")) {
            cy.log("Logging in...");
            cy.get('[data-test="auth-login-text"]').click();
            cy.get('[data-test="auth-email-input"]').type(email);
            cy.get('[data-test="auth-password-input"]').type(password);
            cy.get('[data-test="auth-submit-button"]').click();
            cy.wait(1000);
            cy.visit("/home");
            cy.get('[data-test="NavBarAdminDashboard"]', { timeout: 10000 }).should("be.visible");
        } else {
            cy.log("User is already logged in.");
        }
    });
});

// Base layer - Authentication
Cypress.Commands.add("loginUser", (email, password) => {
    cy.session([email, password], () => {
        cy.visit("/");
        cy.get('[data-test="auth-login-text"]').click();
        cy.get('[data-test="auth-email-input"]').type(email);
        cy.get('[data-test="auth-password-input"]').type(password);
        cy.get('[data-test="auth-submit-button"]').click();
        cy.get('[data-test="NavBarAdminDashboard"]').should("be.visible");
    });
});

// Bot Management
Cypress.Commands.add("createTextBotFromScratch", (botName) => {
    cy.get('a.ui.card').click();
    cy.get('button').contains('Create from scratch').click();
    cy.get('input[placeholder="Marketing Chatbot"]').type(botName);
    cy.get('button').contains('Create').click();
});

// Cleanup
Cypress.Commands.add("deleteTestBot", (botName) => {
    // Add logic to delete the test bot
});

Cypress.Commands.add('selectBot', (botName) => {
    // Add logic to select/click on the bot with the given name
    cy.get('[data-test="bot-card"]')
        .contains(botName)
        .click();
});

Cypress.Commands.add('deleteBot', (botName) => {
    // Add logic to delete the bot with the given name
    cy.get('[data-test="bot-card"]')
        .contains(botName)
        .parent()
        .find('[data-test="delete-bot-button"]') // Update selector based on your UI
        .click();
    
    // Confirm deletion if there's a confirmation dialog
    cy.get('[data-test="confirm-delete-button"]') // Update selector based on your UI
        .click();
});
  