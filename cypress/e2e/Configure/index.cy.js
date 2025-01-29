let loginCredentials;
let botName = `TestBot-${Date.now()}`;

describe("Configure Tab Tests", () => {
  before(() => {
    // Load the login credentials from fixtures before running tests
    cy.fixture("loginCredentials").then((credentials) => {
      loginCredentials = credentials;
    });

    // Login and create bot once before all tests
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");

    // Generate a unique bot name and store it
    cy.createTextBotFromScratch(botName);
  });

  beforeEach(() => {
    // Only check login before each test
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/home");

    // Navigate to the bot we created
    // You might need to add a custom command to select the existing bot
    cy.selectBot(botName); // You'll need to create this command
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
    ).click();
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
    cy.get('[data-test="configureSectionSidebar"]').should("exist");
    cy.get('[data-test="configureSectionSidebar"]').contains(
      "General Settings"
    );
    cy.get('[data-test="configureSectionSidebar"]').contains("SEO Settings");
    cy.get('[data-test="configureSectionSidebar"]').contains(
      "Email Notification"
    );
    cy.get('[data-test="configureSectionSidebar"]').contains("Goal & Tracking");
    cy.get('[data-test="configureSectionSidebar"]').contains("Voice & Audio");
  });

  // General Settings
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

  it("MultiLanguage select", () => {
    cy.get('[data-test="ConfigureGeneralSettingsChatbotMultiLanguage"]').should(
      "exist"
    );
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

  // SEO Settings
  it("Click on SEO Settings and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("SEO Settings")
      .click();
    cy.get('[data-test="ConfigureSectionSeoForm"]').should("exist");
  });

  it("Click on SEO Settings and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("SEO Settings")
      .click();
    cy.get('[data-test="ConfigureSectionSeoForm"]').should("exist");
  });

  it("Upload meta image", () => {
    cy.fixture("metaImage.jpg", "base64").then((fileContent) => {
      cy.get("[data-test=configureSectionSEOMetaImage]")
        .click()
      .then(() => {
        // Convert file content to a Blob and create a File
        const blob = Cypress.Blob.base64StringToBlob(
          fileContent,
          "image/jpeg",
        );
        const testFile = new File([blob], fileName, { type: 'image/jpeg' });
        cy.get('[data-test=FileUploadContainer] input[type=file]').then(($input) => {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            const fileList = dataTransfer.files;
            $input[0].files = fileList;
            cy.wrap($input).trigger('change', { force: true });
        });
      });
  });
  
  cy.get("[data-test=configureSectionSEOMetaImage]").should("contain", fileName);
  });

  it("Disable favicon icon", () => {
    cy.get('[data-test="configureSectionSEOdisableFaviconToggle"]')
      .exists();
    cy.get('[data-test="configureSectionSEOdisableFaviconToggle"]')
      .find("input")
			.should("have.attr", "type", "checkbox")
			.check({ force: true }); ;
  });



  // Email Notification
  it("Click on Email Notification and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("Email Notification")
      .click();
    cy.get('[data-test="ConfigureSectionEmailNotificationForm"]').should(
      "exist"
    );
  });

  it("Click on Email Subject and type new subject", () => {
    cy.get('[data-test="Email_Subject"]')
      .find("input")
      .type("configure.subject")
  });

  it("Click on Email Id and type new id", () => {
    cy.get('[data-test="ConfigureEmailNotificationEmailID"]')
      .find("input")
      .type("configure.email")
  });

  // Goal & Tracking
  it("Click on Goal & Tracking and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("Goal & Tracking")
      .click();
    cy.get('[data-test="ConfigureSectionGoalTrackingForm"]').should("exist");
  });

  it("Save changes", () => {
    cy.get('[data-test="SaveButton"]').click(); // Use the appropriate selector for your save button
  });

it("Check if Subject and Id are updated", () => {
    cy.reload();
    cy.get('[data-test="Email_Subject"]')
      .find("input")
      .should("have.value", "configure,subject");
    cy.get('[data-test="ConfigureEmailNotificationEmailID"]')
      .find("input")
      .should("have.value", "configure.email");
  });

  // Voice & Audio
  it("Click on Voice & Audio and check for the content", () => {
    cy.get('[data-test="configureSectionSidebar"]')
      .contains("Voice & Audio")
      .click();
    cy.get('[data-test="ConfigureSectionVoiceAudioForm"]').should("exist");
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
