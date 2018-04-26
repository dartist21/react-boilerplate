describe('Edit movie test', () => {
  beforeEach(() => {
    cy.fixture('movie').as('movie');
  });

  it('Editing movie', function () {
    cy.visit('/movies/');

    cy
      .get('div[class*=MovieCard]')
      .first()
      .click();

    cy.contains('Edit movie').click();

    cy
      .get('input[name=title]')
      .clear()
      .type(this.movie.title)
      .should('have.value', this.movie.title);

    cy
      .get('input[name=poster]')
      .clear()
      .type(this.movie.poster)
      .should('have.value', this.movie.poster);

    cy
      .get('textarea[name=description]')
      .clear()
      .type(this.movie.description)
      .should('have.value', this.movie.description);

    cy
      .get('input[name=year]')
      .clear()
      .type(this.movie.year)
      .should('have.value', this.movie.year);

    cy
      .get('input[name=director]')
      .clear()
      .type(this.movie.director)
      .should('have.value', this.movie.director);

    cy
      .get('input[id=is_favorite]')
      .check()
      .should('be.checked');

    cy.get('button').click();

    cy.location('pathname').should('not.contains', 'edit');
  });
});
