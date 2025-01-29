let loginCredentials;
let botName = `TestBot-${Date.now()}`;

describe("Configure Tab Tests", () => {
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


  after(() => {
    // Delete the bot after all tests are complete
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");
    cy.deleteBot(botName); // You'll need to create this command
  });

  it("should verify that the configure tab exists", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
    ).should("exist");
  });

  it("Check configure sidebar exists", () => {
    cy.get('[data-test="configureSectionSidebar"]').should("exist");
  });

  it("Check configure sidebar has the correct tabs", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  // General Settings
  it("Click on General Settings and check for the content", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  it("Edit title", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  it("Edit subdomain", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  it("MultiLanguage select", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  it("Check if title and subdomain are updated", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  // SEO Settings
  it("Click on SEO Settings and check for the content", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  // Email Notification
  it("Click on Email Notification and check for the content", () => {
    cy.get('[data-test="auth-login-text"]').click();
    cy.get('[data-test="auth-email-input"]').type(loginCredentials.email);
    cy.get('[data-test="auth-password-input"]').type(loginCredentials.password);
  });

  // Goal & Tracking
  it("Click on Goal & Tracking and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("Goal & Tracking")
      .click();
    cy.get('[data-test="ConfigureSectionGoalTrackingForm"]').should("exist");
  });

  // Voice & Audio
  it("Click on Voice & Audio and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("Voice & Audio")
      .click();
    cy.get('[data-test="ConfigureSectionVoiceAudioForm"]').should("exist");
  });
});
