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
      cy.createNewTestBot(TestChatbotName)
    })
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

  it("Assert that the configure tab is inactive by default", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).should("exist")
  })

  it("Assert that the configure tab gets active when clicked", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
    ).should("exist")
  })

  it("Assert that the url is correct when the configure tab is clicked", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.url().should("include", "/configure")
  })

  it("Assert that the sidebar is visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get('[data-test="ConfigureSectionSidebar"]').should("exist")
  })

  it("Assert that the sidebar menu items:[General Settings, SEO Settings, Email Settings, Voice & Audio, Goal & Tracking] are visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    configureSidebarItems.menuItems.forEach((item) => {
      cy.get(`[data-test="ConfigureSectionSidebar-${item}"]`).should("exist")
    })
  })

  //General Settings
  it("Assert that the General Settings is visible", () => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).click()
    cy.get('[data-test="ConfigureSectionGeneralForm"]').should("exist")
  })

  it("Assert that the General Settings form fields are visible", () => {
    cy.assert_general_settings_elements_exists(configureSidebarItems)
  })

  it("Assert that the General Settings Inputs are visible and have the correct default values", () => {
    cy.assert_general_settings_chatbot_title(TestChatbotName)
    cy.assert_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainDefault
    )
    cy.assert_general_settings_chatbot_description(
      configureSidebarItems.general.descriptionDefault
    )
  })

  it("Assert that the General Settings form inputs are editable and the values are updated", () => {
    cy.update_general_settings_chatbot_title(
      configureSidebarItems.general.titleInput
    )
    cy.update_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainInput
    )
    cy.update_general_settings_chatbot_description(
      configureSidebarItems.general.descriptionInput
    )
  })

  it("Click the General Settings Save button and assert that the values are saved", () => {
    cy.configure_section_save_button()
  })

  it("Assert that the General Settings form inputs are updated with the new values", () => {
    cy.assert_general_settings_chatbot_title(
      configureSidebarItems.general.titleInput
    )
    cy.assert_general_settings_chatbot_subdomain(
      configureSidebarItems.general.subdomainInput
    )
    cy.assert_general_settings_chatbot_description(
      configureSidebarItems.general.descriptionInput
    )
  })

  //SEO Settings
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

  //Email Settings
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

  //Voice & Audio

  //Goal & Tracking
})
