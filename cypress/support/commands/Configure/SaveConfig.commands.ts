/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      configure_section_save_button(): Chainable<void>
    }
  }
}

export const configure_section_save_button = () => {
  cy.get('[data-test="NavBarChatbotDashboard"]').within(() => {
    cy.get(
      '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentInactive"]'
    ).then(($inactive) => {
      if ($inactive.length) {
        $inactive.click() // Click if Active component is present
      } else {
        cy.get(
          '[data-test="ExpandedNavBarChatbotDashboardConfigureNavComponentActive"]'
        ).click() // Otherwise, click the Inactive component
      }
    })
  })
  cy.get('[data-test="ConfigureGeneralSettingsSaveButton"]').click()
}

Cypress.Commands.add(
  "configure_section_save_button",
  configure_section_save_button
)

export {}
