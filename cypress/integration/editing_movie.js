describe('Editing film test', () => {
  it('Editing film', () => {
    cy.request('/api/movies').then((resp) => {
      const film = resp.body.data.pop();

      cy.visit(`/movies/${film.id}/edit`);

      cy
        .get('input[name=title]')
        .clear()
        .type('Test title');

      cy
        .get('input[name=poster]')
        .clear()
        .type(
          'https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
        );

      cy
        .get('textarea[name=description]')
        .clear()
        .type('Test description');

      cy
        .get('input[name=year]')
        .clear()
        .type('2000');

      cy
        .get('input[name=director]')
        .clear()
        .type('Test director');

      cy.get('input[id=is_favorite]').click();

      cy.get('button').click();

      cy.location('pathname').should('eq', `/movies/${film.id}`);
    });
  });
});
