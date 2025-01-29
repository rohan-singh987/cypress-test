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

  it("Click on General Settings and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("General Settings")
      .click();
    cy.get('[data-test="ConfigureSectionGeneralForm"]').should("exist");
  });

  it("Edit title", () => {
    cy.get('[data-test="ConfigureGeneralSettingsChatbotTitle"]').should(
      "exist"
    );
    cy.get('[data-test="ConfigureGeneralSettingsChatbotTitle"]')
      .find("input")
      .clear()
      .type("Cypress_testBot");
  });

  it("Edit subdomain", () => {
    cy.get('[data-test="ConfigureGeneralSettingsChatbotSubdomain"]').should(
      "exist"
    );
    cy.get('[data-test="ConfigureGeneralSettingsChatbotSubdomain"]')
      .find("input")
      .clear()
      .type("Cypress_testBot");
  });

  // Trigger save if required
  it("Save changes", () => {
    cy.get('[data-test="SaveButton"]').click(); // Use the appropriate selector for your save button
  });

  it("Check if title and subdomain are updated", () => {
    cy.reload();
    cy.get('[data-test="ConfigureGeneralSettingsChatbotTitle"]')
      .find("input")
      .should("have.value", "Cypress_testBot");
    cy.get('[data-test="ConfigureGeneralSettingsChatbotSubdomain"]')
      .find("input")
      .should("have.value", "Cypress_testBot");
  });
});
