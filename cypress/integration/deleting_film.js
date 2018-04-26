describe('Deleting film test', () => {
  it('Deleting film', () => {
    cy.request('/api/movies').then((resp) => {
      const film = resp.body.data.pop();

      cy.visit(`/movies/${film.id}/`);

      cy.get('button').click();

      cy.location('pathname').should('eq', '/movies');
    });
  });
});
