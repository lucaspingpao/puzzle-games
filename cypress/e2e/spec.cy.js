describe("WordHole game", () => {
  beforeEach(() => {
    cy.visit("/wordle");
  });

  it("goes through a successful play", () => {
    cy.stub(Math, "random").returns(0.36); // word should be 'greed'
    cy.wait(100);
    cy.get('body').type('hello');
    cy.get('.board-rows').first().find('.wordle-row').first().should('contain', 'H');
    cy.get('body').type('great');
    cy.get('body').type('greed');
    // cy.get('.result-message').should('be.visible');
    // cy.get('.result-message').should('have.text', 'You won!');
  });

  it('goes through an unsuccessful play', () => {
    cy.wait(100)
    // Make 6 wrong guesses
    for(let i = 0; i < 6; i++) {
      cy.get('body').type('wrong');
    }
    cy.get('.result-message').should('be.visible');
    cy.get('.result-message').should('have.text', 'You lost!');
  });

  it('should display the rows', () => {
    cy.get('.timer-display').should('exist')
    cy.get('.board-rows').should('exist')
  });

  it('should handle invalid words', () => {
    cy.wait(100)
    cy.get('body').type('QWERT');
    cy.get('.board-rows').first().find('.wordle-row').first().should('contain', 'Q');
    cy.get('body').type('A');
    cy.get('.board-rows').first().find('.wordle-row').first().should('contain', 'Q');
  });

  it('should have a working screen keyboard', () => {
    cy.get('.keyboard-key').should('exist');
    cy.get('.keyboard-key').contains('A').click();
    cy.get('.board-rows').first().find('.wordle-row').first().should('contain', 'A');
  });
});
