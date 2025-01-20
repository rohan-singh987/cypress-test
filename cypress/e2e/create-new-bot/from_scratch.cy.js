const generateBotName = (() => {
    return () => `Test Bot ${Date.now()}`;
})();
const botName = generateBotName();
let loginCredentials;

const extractConv_Id = (url) => url.match(/\/conv\/([^/]+)/)[1];

describe("Create a new bot from scratch", () => {

    beforeEach(() => {
        // Load the login credentials from fixtures before running tests
        cy.fixture('loginCredentials').then((credentials) => {
        loginCredentials = credentials;
    });

      cy.CheckLogin(loginCredentials.email, loginCredentials.password); // Call the custom login command
      cy.visit("/home");
    });

    it("Check if user is logged in by checking the sidebar", () => {
        cy.get('[data-test="NavBarAdminDashboard"]').should("be.visible");
    });

    it("should create a new bot from scratch", () => {
        cy.get('a.ui.card').should("be.visible").click();
        cy.get('div.ui.modal.visible.active').should("be.visible");
        cy.get('button').contains('Create from scratch').click();
        cy.get('input[placeholder="Marketing Chatbot"]').type(botName);
        cy.get('button').contains('Create').click();
    });

    it("Check if the bot is created", () => {
        // Ensure the bot creation is associated with the logged-in user's email
        cy.get("div[title]").should("have.attr", "title", `Created by ==> ${loginCredentials.email}`).and("be.visible");
    
        // Check if the bot's name is visible in the chatbot title header
        cy.get('.header.chatbot-title')
          .should("contain.text", botName)
          .and("be.visible");
    
        // Optional: Check if the creation date is visible
        cy.get('.meta .date')
          .should("be.visible")
          .and("not.be.empty"); // Ensures there's a valid date
    });

    it(`open the ${botName} chatbot and add a gambit and publish it`, () => {
        // Look for a bot card with the specific title and check if the bot name is present
        cy.get("div[title]")
          .should("have.attr", "title", `Created by ==> ${loginCredentials.email}`)
          .and("be.visible")
          .within(() => {
            // Check if the bot name is visible under the title in the chatbot card
            cy.get('.header.chatbot-title')
              .should("contain.text", botName)
              .and("be.visible")
              .click();  // Click the bot title to open the chatbot
          });
    
        // Optional: Confirm that the bot page has opened by checking for a unique element
        cy.url().should('include', '/conv/');  // Assuming the URL changes when opening a chatbot
        
        cy.get(".reactflow-build-view").within(() => {
            cy.get(".add-gambit").should("be.visible");
            cy.get(".add-gambit").click();
        });

        cy.wait(5000);

        cy.get("#reactFlowCanvas").within(() => {
            cy.get(".react-flow__node-Gambit").should("exist");
        });

        cy.get('[data-test="MenuBarPublishButton"]').click();

        cy.wait(5000);
 
        cy.get('[data-test="MenuBarLaunchButton"]').click();
    });

    it("Check if the bot is published and open it", () => {
        cy.url().should('include', 'conv/').then((url) => {
            const botId = extractConv_Id(url);
            cy.log("Extracted Bot ID:", botId);
            cy.visit(`/conv/${botId}?_env=staging`);
            
            cy.get('[data-test="PageBackground"]', { timeout: 10000 }).should("be.visible");
            cy.get('[data-test="TextField"]').type("Hello");
        });
    });

});
  