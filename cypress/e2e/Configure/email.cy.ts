import { generateBotTestData } from "../../support/commands/CreateNewTestBot.commands"

let loginCredentials: {
  validUser: { email: string; password: string }
  invalidUser: { email: string; password: string }
}
let configureSidebarItems: {
  menuItems: string[]
  email: {
    emailSettingsTitle: string
    emailSettingsDescription: string
    subjectDefault: string
    subjectInput: string
    emailIDInput: string
  }
}

let TestChatbotName = generateBotTestData().TestChatbotName

before(() => {
  // First load the credentials
  cy.fixture("Login/credentials").then((credentials) => {
    loginCredentials = credentials

    cy.then(() => {
      cy.ensureIfUserIsLoggedIn(
        loginCredentials.validUser.email,
        loginCredentials.validUser.password
      )
      cy.visit("/home")
      cy.createNewTestBot(TestChatbotName)
    })
  })

  cy.fixture("Configure/configure").then((sidebarMenuItems) => {
    configureSidebarItems = sidebarMenuItems.sidebarMenuItems
  })
})

beforeEach(() => {
  // Ensure user is logged in before each test
  cy.ensureIfUserIsLoggedIn(
    loginCredentials.validUser.email,
    loginCredentials.validUser.password
  )
  cy.visit("/home")

  // Navigate to the bot we created to select the existing bot
  cy.selectTestBot(TestChatbotName)
})

describe("E2E testing suite for Configure section of chatbot", () => {
  it("Assert that the bot dashboard is visible", () => {
    cy.get('[data-test="NavBarChatbotDashboard"]').should("exist")
  })

  it("Assert that the url is correct when the configure tab is clicked", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.url().should("include", "/configure")
  })

  it("Assert that the sidebar menu items:[General Settings, SEO Settings, Email Settings, Voice & Audio, Goal & Tracking] are visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    configureSidebarItems.menuItems.forEach((item) => {
      cy.get(`[data-test="ConfigureSectionSidebar-${item}"]`).should("exist")
    })
  })

  it("Assert that the Email Settings form is visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[2]}"]`
    ).should("exist")
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[2]}"]`
    ).click()
    cy.get('[data-test="ConfigureSectionEmailNotificationForm"]').should(
      "exist"
    )
  })

  it("Assert that the Email Settings form fields are visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[2]}"]`
    ).click()
    cy.get('[data-test="ConfigureSectionEmailNotificationChatbotTitle"]')
      .should("exist")
      .should("have.value", configureSidebarItems.email.emailSettingsTitle)
    cy.get('[data-test="ConfigureSectionEmailNotificationChatbotDescription"]')
      .should("exist")
      .should(
        "have.value",
        configureSidebarItems.email.emailSettingsDescription
      )
    //Save Button
    cy.get(`[data-test="ConfigureSectionSaveButton"]`).should("exist")
  })

  it("Assert that the SEO Settings form inputs are visible and have the correct default values", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[2]}"]`
    ).click()
    cy.get('[data-test="ConfigureSectionEmailNotificationChatbotSubject"]')
      .should("exist")
      .find("input")
      .should(
        "have.value",
        configureSidebarItems.email.subjectDefault + " " + TestChatbotName
      )
    cy.get('[data-test="ConfigureSectionEmailNotificationEmailIDInput"]')
      .find(".MuiChip-label")
      .invoke("text")
      .should("eq", loginCredentials.validUser.email)
  })

  it("Assert that the Email Settings form inputs are editable, Testing: {Email Subject, Email ID}", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[2]}"]`
    ).click()
    cy.get('[data-test="ConfigureSectionEmailNotificationChatbotSubject"]')
      .find("input")
      .clear()
      .type(configureSidebarItems.email.subjectInput)
      .should("have.value", configureSidebarItems.email.subjectInput)
    cy.get('[data-test="ConfigureSectionEmailNotificationEmailIDInput"]')
      .find(".MuiChip-label")
      .click()
    cy.get('[data-test="ConfigureSectionEmailNotificationEmailIDInput"]')
      .find("input")
      .clear()
      .type(configureSidebarItems.email.emailIDInput)
      .should("have.value", configureSidebarItems.email.emailIDInput)
  })
})
