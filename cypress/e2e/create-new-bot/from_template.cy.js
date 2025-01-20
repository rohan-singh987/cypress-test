let loginCredentials;

const generateBotName = (() => {
    return () => `Test Bot ${Date.now()}`;
})();
const botName = generateBotName();

const extractConv_Id = (url) => url.match(/\/conv\/([^/]+)/)[1];

describe("Create a new bot from template", () => {
    before(() => {
        // Load credentials before any tests run
        cy.fixture('loginCredentials').then((credentials) => {
            loginCredentials = credentials;
        });
    });
    
    beforeEach(() => {
        cy.CheckLogin(loginCredentials.email, loginCredentials.password);
        cy.visit("/home");
    });

    it("Check if user is logged in by checking the sidebar", () => {
        cy.get('[data-test="NavBarAdminDashboard"]').should("be.visible");
    });

    it("Select template tab on Sidebar", () => {
        cy.get('[data-test="NavBarAdminDashboard"]').should("be.visible");
        cy.get('[data-test="CollapsedNavBarAdminDashboardChatbotTemplatesNavComponentActive"]').should("be.visible").click();
    });

    it("Select a template", () => {
        cy.get('[data-test="CollapsedNavBarAdminDashboardChatbotTemplatesNavComponentActive"]').should("be.visible").click();
        cy.get('a').contains('href', 'https://staging.hellotars.com/home/#/chatbot-templates/finance-banking/r1DYYe/').click();
    });

    it("Create a new bot from template", () => {
        cy.get('a').contains('href', 'https://staging.hellotars.com/home/#/chatbot-templates/finance-banking/r1DYYe/').click();

        cy.wait(2000);
        cy.get('button').contains('Use this template').click();

    });

});
