import botCreationPage from '../../support/pageObjects/botCreationPage';
import { generateTestData, cleanupTestData } from '../../support/testData';

let loginCredentials;

const generateBotName = (() => {
    return () => `Test Bot ${Date.now()}`;
})();
const botName = generateBotName();

const extractConv_Id = (url) => url.match(/\/conv\/([^/]+)/)[1];

describe("Create a new bot from scratch", () => {
    let testData;

    before(() => {
        // Generate fresh test data for this suite
        testData = generateTestData();
        
        // Load credentials
        cy.fixture('loginCredentials').then((credentials) => {
            cy.loginUser(credentials.email, credentials.password);
        });
    });

    beforeEach(() => {
        // Restore application state
        cy.visit("/home");
    });

    afterEach(() => {
        // Cleanup after each test if needed
    });

    after(() => {
        // Clean up all test data
        cleanupTestData(testData);
    });

    it("Check if user is logged in by checking the sidebar", () => {
        cy.get('[data-test="NavBarAdminDashboard"]').should("be.visible");
    });

    it("should create a new bot from scratch", () => {
        botCreationPage.createFromScratch(testData.botName);
        botCreationPage.verifyBotCreated(testData.botName, loginCredentials.email);
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
  