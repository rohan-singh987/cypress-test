let loginCredentials: {
  validUser: { email: string; password: string }
  invalidUser: { email: string; password: string }
}

describe("Login E2E test", () => {
  before(() => {
    // Load the login credentials from fixtures before running tests
    cy.fixture("Login/credentials").then((credentials) => {
      loginCredentials = credentials
    })
  })

  beforeEach(() => {
    cy.visit("/")
  })

  it("Click on login button", () => {
    cy.get('[data-test="auth-login-text"]').click()
  })

  it("Fill in email and password", () => {
    cy.get('[data-test="auth-login-text"]').click()
    cy.get('[data-test="auth-email-input"]').type(
      loginCredentials.validUser.email
    )
    cy.get('[data-test="auth-password-input"]').type(
      loginCredentials.validUser.password
    )
  })

  it("Click on login button", () => {
    cy.get('[data-test="auth-login-text"]').click()
    cy.get('[data-test="auth-email-input"]').type(
      loginCredentials.validUser.email
    )
    cy.get('[data-test="auth-password-input"]').type(
      loginCredentials.validUser.password
    )
    cy.get('[data-test="auth-submit-button"]').click()
  })

  it("Check if user is logged in", () => {
    cy.get('[data-test="auth-login-text"]').click()
    cy.get('[data-test="auth-email-input"]').type(
      loginCredentials.validUser.email
    )
    cy.get('[data-test="auth-password-input"]').type(
      loginCredentials.validUser.password
    )
    cy.get('[data-test="auth-submit-button"]').click()
    cy.wait(5000)
    cy.visit("/home")
    cy.get('[data-test="NavBarAdminDashboard"]', { timeout: 50000 }).should(
      "be.visible"
    )
  })
})
