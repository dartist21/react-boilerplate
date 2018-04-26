describe('Create movie test', () => {
  beforeEach(() => {
    cy.fixture('movie').as('movie');
  });

  it('creating favorite  movie', function () {
    cy.visit('/movies/create');

    cy
      .get('input[name=title]')
      .type(this.movie.title)
      .should('have.value', this.movie.title);

    cy
      .get('input[name=poster]')
      .type(this.movie.poster)
      .should('have.value', this.movie.poster);

    cy
      .get('textarea[name=description]')
      .type(this.movie.description)
      .should('have.value', this.movie.description);

    cy
      .get('input[name=year]')
      .type(this.movie.year)
      .should('have.value', this.movie.year);

    cy
      .get('input[name=director]')
      .type(this.movie.director)
      .should('have.value', this.movie.director);

    cy
      .get('input[id=is_favorite]')
      .check()
      .should('be.checked');

    cy.get('label[for=is_favorite]').should('contain', 'Remove from favorite');

    cy.get('button').click();
    cy.location('pathname').should('not.eq', '/movies/create');
  });
});
