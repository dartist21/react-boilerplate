describe('Delete movie test', () => {
  it('Deleting film', () => {
    cy.visit('/movies/');

    cy
      .get('div[class*=MovieCard]')
      .first()
      .click();

    cy.get('button').click();

    cy.location('pathname').should('eq', '/movies');
  });
});
