import { generateBotTestData } from "../../support/commands/CreateNewTestBot.commands"

let loginCredentials: {
  validUser: { email: string; password: string }
  invalidUser: { email: string; password: string }
}
let configureSidebarItems: {
  menuItems: string[]
  seo: {
    metaTitle: string
    metaDescription: string
    faviconTitle: string
    faviconDescription: string
    chatbotDescriptionTitle: string
    chatbotDescriptionDescription: string
    metaTitleInput: string
    metaImageLinkInput: string
    IndustryInputKey: string
    IndustryInputValue: string
    UseCaseInputKey: string
    UseCaseInputValue: string
    ChatbotDescriptionInput: string
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

  it("Assert that the SEO Settings form is visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[1]}"]`
    ).should("exist")
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[1]}"]`
    ).click()
    cy.get('[data-test="ConfigureSectionSEOSettingsForm"]').should("exist")
  })

  it("Assert that the SEO Settings form fields are visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[1]}"]`
    ).click()
    //Meta Information
    cy.get(`[data-test="ConfigureSectionSEOSettingsTitle"]`)
      .should("exist")
      .should("have.value", configureSidebarItems.seo.metaTitle)
    cy.get(`[data-test="ConfigureSectionSEOSettingsDescription"]`)
      .should("exist")
      .should("have.value", configureSidebarItems.seo.metaDescription)
    //Favicon
    cy.get(`[data-test="ConfigureSectionSEOSettingsFaviconTitle"]`)
      .should("exist")
      .should("have.value", configureSidebarItems.seo.faviconTitle)
    cy.get(`[data-test="ConfigureSectionSEOSettingsFaviconDescription"]`)
      .should("exist")
      .should("have.value", configureSidebarItems.seo.faviconDescription)
    //Chatbot Description
    cy.get(`[data-test="ConfigureSectionSEOSettingsChatbotDescriptionTitle"]`)
      .should("exist")
      .should("have.value", configureSidebarItems.seo.chatbotDescriptionTitle)
    cy.get(`[data-test="ConfigureSectionSEOChatbotDescriptionDescription"]`)
      .should("exist")
      .should(
        "have.value",
        configureSidebarItems.seo.chatbotDescriptionDescription
      )

    //Save Button
    cy.get(`[data-test="ConfigureSectionSaveButton"]`).should("exist")
  })

  it("Assert that the SEO Settings form inputs are visible and have the correct default values", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[1]}"]`
    ).click()
    //Meta Information
    cy.get('[data-test="ConfigureSEOSettingsMetaInfo"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsMetaImage"]')
      .should("exist")
    cy.get('[data-test="ConfigureSEOSettingsMetaInfo"]')
      .should("exist")
      .find('[data-test="SEOSettingsMetaImageUploadImageOrAddLink"]')
      .should("exist")
    cy.get('[data-test="ConfigureSEOSettingsMetaInfo"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsMetaTitleInput"]')
      .should("exist")
      .find("input")
      .should("have.value", TestChatbotName + " | TARS")
    //Favicon
    cy.get('[data-test="ConfigureSEOSettingsFavIcon"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsFaviconSwitch"]') // Switch element
      .as("switch")
    cy.get("@switch").should("not.have.class", "Mui-checked")
    cy.get('[data-test="ConfigureSEOSettingsFavIcon"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsFaviconImageContainer"]')
      .should("exist")
    //Chatbot Description
    cy.get('[data-test="ConfigureSectionSEOSettingsChatbotDescriptionBox"]')
      .should("exist")
      .find('[data-test="ConfigureSEOSettingsChatbotDescription"]')
      .should("exist")
    cy.get('[data-test="ConfigureSEOSettingsChatbotDescription"]')
      .should("exist")
      .find('[data-test="Industry"]')
      .should("exist")
    cy.get('[data-test="default"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", "Industry")
    cy.get('[data-test="ConfigureSEOSettingsChatbotDescription"]')
      .should("exist")
      .find('[data-test="Use Case"]')
      .should("exist")
    cy.get('[data-test="default"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", "Use Case")
    cy.get('[data-test="ConfigureSEOSettingsChatbotDescription"]')
      .should("exist")
      .find('[data-test="Meta Description"]')
      .should("exist")
      .find("textarea")
      .invoke("text")
      .should("eq", "")
  })

  it("Assert that the SEO Settings form inputs are editable, Testing: {Meta Image Add Link, Meta Title, Favicon Toggle, Chatbot Description}", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      `[data-test="ConfigureSectionSidebar-${configureSidebarItems.menuItems[1]}"]`
    ).click()
    //Meta Information
    cy.get('[data-test="ConfigureSEOSettingsMetaInfo"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsMetaTitleInput"]')
      .find("input")
      .clear()
      .type(configureSidebarItems.seo.metaTitleInput)
      .should("have.value", configureSidebarItems.seo.metaTitleInput)
    cy.get(
      '[data-test="ConfigureSectionSEOSettingsMetaImageAddLinkButton"]'
    ).click()
    cy.get('[data-test="ConfigureSectionSEOSettingsMetaImageAddLinkInput"]')
      .should("exist")
      .find("input")
      .clear()
      .type(configureSidebarItems.seo.metaImageLinkInput)
      .should("have.value", configureSidebarItems.seo.metaImageLinkInput)
    cy.get(
      '[data-test="ConfigureSectionSEOSettingsMetaImageGoBackButton"]'
    ).click()
    //Favicon
    cy.get('[data-test="ConfigureSectionSEOSettingsFaviconSwitch"]').as(
      "switch"
    )
    cy.get("@switch").should("not.have.class", "Mui-checked")
    cy.get("@switch").click()
    cy.get("@switch").should("have.class", "Mui-checked")

    //Chatbot Description
    cy.get('[data-test="Industry"]').find('[data-test="default"]').click()
    cy.get(
      `[data-test="${configureSidebarItems.seo.IndustryInputKey}"]`
    ).click()
    cy.get('[data-test="default"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", configureSidebarItems.seo.IndustryInputValue)
    cy.get('[data-test="Use Case"]').find('[data-test="default"]').click()
    cy.get(`[data-test="${configureSidebarItems.seo.UseCaseInputKey}"]`).click()
    cy.get('[data-test="default"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", configureSidebarItems.seo.UseCaseInputValue)
    cy.get('[data-test="Meta Description"]')
      .find("textarea")
      .clear()
      .type(configureSidebarItems.seo.ChatbotDescriptionInput)
      .should("have.value", configureSidebarItems.seo.ChatbotDescriptionInput)
  })

  it("Click the SEO Settings Save button and assert that the values are saved", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(`[data-test="${configureSidebarItems.menuItems[1]}"]`).click()
    cy.get(`[data-test="ConfigureSectionSaveButton"]`).click()
  })

  it("Assert that the SEO Settings form inputs are updated with the new values", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(`[data-test="${configureSidebarItems.menuItems[1]}"]`).click()
    cy.get('[data-test="ConfigureSEOSettingsMetaInfo"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsMetaTitleInput"]')
      .find("input")
      .should("have.value", configureSidebarItems.seo.metaTitleInput)
    cy.get('[data-test="ConfigureSEOSettingsFavIcon"]')
      .should("exist")
      .find('[data-test="ConfigureSectionSEOSettingsFaviconSwitch"]')
      .should("have.class", "Mui-checked")
    cy.get('[data-test="ConfigureSectionSEOSettingsChatbotDescriptionBox"]')
      .should("exist")
      .find('[data-test="Industry"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", configureSidebarItems.seo.IndustryInputValue)
    cy.get('[data-test="Use Case"]')
      .find('[role="button"]')
      .invoke("text")
      .should("eq", configureSidebarItems.seo.UseCaseInputValue)
    cy.get('[data-test="Meta Description"]')
      .find("textarea")
      .should("have.value", configureSidebarItems.seo.ChatbotDescriptionInput)
  })
})
