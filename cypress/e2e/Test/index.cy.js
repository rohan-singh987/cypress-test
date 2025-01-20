describe('Debugging Example', () => {
    it('should debug the DOM state', () => {
      cy.visit('https://staging.hellotars.com');
      cy.get('body').debug(); // Halts here and shows the state of the body element
    });
  });