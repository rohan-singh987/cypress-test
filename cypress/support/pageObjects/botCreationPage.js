class BotCreationPage {
    visit() {
        cy.visit('/home');
    }

    createFromScratch(botName) {
        cy.createNewBot(botName);
    }

    verifyBotCreated(botName, userEmail) {
        cy.get("div[title]")
            .should("have.attr", "title", `Created by ==> ${userEmail}`)
        cy.get('.header.chatbot-title')
            .should("contain.text", botName);
    }
}

export default new BotCreationPage(); 