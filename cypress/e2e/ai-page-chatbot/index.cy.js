let loginCredentials;

describe("User Dashboard Tests", () => {
  before(() => {
    // Load the login credentials from fixtures before running tests
    cy.fixture('loginCredentials').then((credentials) => {
      loginCredentials = credentials;
    });
  });

  beforeEach(() => {
    cy.CheckLogin(loginCredentials.email, loginCredentials.password);
    cy.visit("/ai");
  });

  it("Should verify that the logo and text are present", () => {
    // Check if the logo is present and visible
    cy.get('img[alt="logo"]')
      .should("be.visible")
      .and("have.attr", "src", "/img/open_ai/tars-prime-logo.svg");

    // Check if the text is present and visible
    cy.get("p")
      .contains("Setup your ChatGPT powered Chatbot with Tars Prime")
      .should("be.visible");
  });

  it("Click on the create new chatbot button", () => {
    cy.get("a").have.attr("href", "/ai/create-chatbot").should("be.visible");
    cy.get("a").click();
  });

  it("Create a new prime chatbot with website (https://help.hellotars.com/en/) data", () => {
    cy.get("p").contains("Select Data Resource").should("be.visible");
    cy.get("data-test=select-data-loader").should("be.visible");

    if (cy.get("data-test = data-loader-website").should("be.visible")) {
      cy.get("data-test = website-url-input").type(
        "https://help.hellotars.com/en/"
      );
      cy.get("data-test = fetch-resources-btn").click();
    } else {
      cy.get("data-test = select-data-loader").click();
      cy.get("data-test = data-loader-website").click();
      cy.get("data-test = website-url-input").type(
        "https://help.hellotars.com/en/"
      );
      cy.get("data-test = fetch-resources-btn").click();
    }

    // Function to wait for and click "create-chatbot-btn"
    const waitForCreateChatbotButton = () => {
      cy.get("body").then(($body) => {
        if ($body.find("[data-test=create-chatbot-btn]").length > 0) {
          // Button is now present in the DOM
          cy.get("[data-test=create-chatbot-btn]").should("be.visible").click();
        } else {
          // Retry until the button appears
          cy.wait(1000); // Wait for 1 second before checking again
          waitForCreateChatbotButton(); // Recursive call
        }
      });
    };

    // Call the function to handle dynamic button appearance
    waitForCreateChatbotButton();

    const waitForChatbotPreview = () => {
        cy.get("body").then(($body) => {
            if ($body.find("#chatbot-preview").length > 0) {
                cy.get("#chatbot-preview").find("iframe").should("exist");
                cy.get("iframe").should("be.visible");
                cy.get("data-test = chatbot-iframe").should("be.visible");
            } else {
                cy.wait(1000);
                waitForChatbotPreview();
            }
        });
    }
    waitForChatbotPreview();

  });
});
