let loginCredentials;

describe("Login E2E test", () => {
  before(() => {
    // Load the login credentials from fixtures before running tests
    cy.fixture('loginCredentials').then((credentials) => {
      loginCredentials = credentials;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("Click on login button", () => {
    cy.get('[data-test="auth-login-text"]').click();
  });

  it("Fill in email and password", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  it("Click on login button", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
    cy.get('[data-test="auth-submit-button"]').click();
  });

  it("Check if user is logged in", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
    cy.get('[data-test="auth-submit-button"]').click();
    
    cy.visit("/home");
    cy.get('button[type="button"] .MuiSvgIcon-root').click();
    cy.get('[data-test="NavBarUserProfileDetailsComponent"]').should("be.visible");
  });
});

