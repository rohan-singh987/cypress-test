let loginCredentials;

describe("Using predefined theme", () => {
    before(() => {
        // Load credentials before any tests run
        cy.fixture('loginCredentials').then((credentials) => {
            loginCredentials = credentials;
        });
    });

    beforeEach(() => {
        cy.CheckLogin(loginCredentials.email, loginCredentials.password);
        cy.visit("/conv/f8pEzp/#/build/make");
    });

    it("Check if we are on the make page", () => {
        cy.url().should('include', '/build/make');
        cy.get('[data-test="NavBarChatbotDashboard"]').should("be.visible");
    });

    it("Go to theme tab", () => {
        cy.get('[data-test="CollapsedNavBarChatbotDashboardDesignNavComponentInactive"]').should("be.visible").click();
        cy.url().should('include', '/build/design');
    });
    
    it("Select a theme", () => {
        cy.get('[data-test="CollapsedNavBarChatbotDashboardDesignNavComponentInactive"]').click();
        cy.get('[data-test="Themes"]').should("be.visible").click();
        
        cy.get('[data-test="card/container/normal"]') // Select the parent element
        .find('[class*="background-color"]')       // Look for child elements with matching class
        .should('have.css', 'background-color', 'rgb(252, 227, 138)') // Check the background color
        .click();
    });

    it("Select a theme and Save it", () => {
        cy.get('[data-test="CollapsedNavBarChatbotDashboardDesignNavComponentInactive"]').click();
        cy.get('[data-test="Themes"]').should("be.visible").click();
        
        cy.get('[data-test="card/container/normal"]') // Select the parent element
        .find('[class*="background-color"]')       // Look for child elements with matching class
        .should('have.css', 'background-color', 'rgb(252, 227, 138)') // Check the background color
        .click();

        cy.get('[data-test="DesignSaveButton"]').should("be.visible").click();
        });
});