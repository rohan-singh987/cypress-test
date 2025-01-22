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
Cypress.Commands.add("createNewBot", (botName) => {
    cy.get('a.ui.card').click();
    cy.get('button').contains('Create from scratch').click();
    cy.get('input[placeholder="Marketing Chatbot"]').type(botName);
    cy.get('button').contains('Create').click();
});

// Cleanup
Cypress.Commands.add("deleteTestBot", (botName) => {
    // Add logic to delete the test bot
});
  