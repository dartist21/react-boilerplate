describe('Checking favorite film test', () => {
  it('Checking favorite film', () => {
    cy.request('/api/movies').then((resp) => {
      const favoriteFilm = resp.body.data.find(f => f.is_favorite === true);

      if (!favoriteFilm) {
        throw new Error('You don t have favorite film');
      }

      cy.visit('/movies/');
      cy.contains(favoriteFilm.title).within(() => {
        cy.get('span > i');
      });

      cy.visit(`/movies/${favoriteFilm.id}`);
      cy.contains(favoriteFilm.title).within(() => {
        cy.get('span > i');
      });
    });
  });
});
