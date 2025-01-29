let loginCredentials;
let botName = `TestBot-${Date.now()}`;

describe("General Settings", () => {
  before(() => {
    cy.fixture("loginCredentials").then((credentials) => {
      loginCredentials = credentials;
    });

    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");
    cy.createTextBotFromScratch(botName);
  });

  beforeEach(() => {
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");
    cy.selectBot(botName);
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
    ).click();
  });

  after(() => {
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");
    cy.deleteBot(botName);
  });


});
