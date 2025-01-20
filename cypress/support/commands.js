// cypress/support/commands.js
Cypress.Commands.add("CheckLogin", (email, password) => {
    cy.visit("/");
    cy.url().then((currentUrl) => {
      if (!currentUrl.includes("/home")) {
        cy.log("Logging in...");
        cy.get('[data-test="auth-login-text"]').click();
        cy.get('[data-test="auth-email-input"]').type(email);
        cy.get('[data-test="auth-password-input"]').type(password);
        cy.get('[data-test="auth-submit-button"]').click();
        cy.url().should("include", "/home");
      } else {
        cy.log("User is already logged in.");
      }
    });
  });
  