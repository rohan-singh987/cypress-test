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

  it("Toggle on TTS", () => {
    cy.get('[data-test="ConfigureVoiceAudioSTT"]')
      .find("input")
			.should("have.attr", "type", "checkbox")
			.check({ force: true });
  });

  it("Toggle on Text Streaming", () => {
    cy.get('[data-test="ConfigureVoiceAudioTextStreaming"]')
      .find("input")
			.should("have.attr", "type", "checkbox")
			.check({ force: true }); 
  });

  it("Toggle on STT", () => {
    cy.get('[data-test="ConfigureVoiceAudioSTT"]')
      .find("input")
			.should("have.attr", "type", "checkbox")
			.check({ force: true }); 
  });


});
