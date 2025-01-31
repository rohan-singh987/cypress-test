import { generateBotTestData } from "../../support/commands/CreateNewTestBot.commands"

let loginCredentials: {
  validUser: { email: string; password: string }
  invalidUser: { email: string; password: string }
}
let configureSidebarItems: {
  menuItems: string[]
  general: {
    description: string
    titleDefault: string
    descriptionDefault: string
    subdomainDefault: string
    titleInput: string
    descriptionInput: string
    subdomainInput: string
  }
}

let TestChatbotName = generateBotTestData().TestChatbotName

before(() => {
  // First load the credentials
  cy.fixture("Login/credentials").then((credentials) => {
    loginCredentials = credentials

    // cy.then(() => {
    //   cy.ensureIfUserIsLoggedIn(
    //     loginCredentials.validUser.email,
    //     loginCredentials.validUser.password
    //   )
    //   cy.createNewTestBot(TestChatbotName)
    // })
  })

  cy.fixture("Configure/configure").then((sidebarMenuItems) => {
    configureSidebarItems = sidebarMenuItems.sidebarMenuItems
  })
})

beforeEach(() => {
  cy.url().then((currentUrl) => {
    if (!currentUrl.includes("/home")) {
      cy.ensureIfUserIsLoggedIn(
        loginCredentials.validUser.email,
        loginCredentials.validUser.password
      )
      cy.selectTestBot(TestChatbotName)
      cy.get(
        '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
      ).click()
    }
  })
})

after(() => {
  cy.deleteTestBot(TestChatbotName)
})

describe("E2E testing suite for Configure section of chatbot", () => {
  it("Assert that the bot dashboard is visible", () => {
    cy.get('[data-test="NavBarChatbotDashboard"]').should("exist")
  })

  it("Assert that the url is correct when the configure tab is clicked", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
    ).click()
    cy.url().should("include", "/configure")
  })

  it("Assert that the sidebar menu items:[General Settings, SEO Settings, Email Settings, Voice & Audio, Goal & Tracking] are visible", () => {
    configureSidebarItems.menuItems.forEach((item) => {
      cy.get(`[data-test="ConfigureSectionSidebar-${item}"]`).should("exist")
    })
  })

  it("Assert that the General Settings is visible", () => {
    cy.get('[data-test="ConfigureSectionGeneralForm"]').should("exist")
  })

  it("Assert that the General Settings form fields are visible", () => {
    cy.assert_general_settings_elements_exists(configureSidebarItems)
  })

  it("Assert that the General Settings Title is visible and has the correct default value", () => {
    cy.assert_general_settings_chatbot_title(TestChatbotName)
  })

  it("Assert that the General Settings Subdomain is visible and has the correct default value", () => {
    cy.assert_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainDefault
    )
  })

  it("Assert that the General Settings Description is visible and has the correct default value", () => {
    cy.assert_general_settings_chatbot_description(
      configureSidebarItems.general.descriptionDefault
    )
  })

  it("Update the General Settings Title", () => {
    cy.update_general_settings_chatbot_title(
      configureSidebarItems.general.titleInput
    )
  })

  it("Update the General Settings Subdomain", () => {
    cy.update_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainInput
    )
  })

  //   it("Update the General Settings Description", () => {
  //     cy.update_general_settings_chatbot_description(
  //       configureSidebarItems.general.descriptionInput
  //     )
  //   })

  it("Click the General Settings Save button and assert that the values are saved", () => {
    cy.configure_section_save_button()
  })

  it("Assert that the General Settings Subdomain is visible and has the updated value", () => {
    cy.assert_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainInput
    )
  })

  it("Assert that the General Settings Description is visible and has the updated value", () => {
    cy.assert_general_settings_chatbot_description(
      configureSidebarItems.general.descriptionInput
    )
  })
})
