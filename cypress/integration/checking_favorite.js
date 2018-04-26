describe('Checking favorite film test', () => {
  beforeEach(() => {
    cy.fixture('movie').as('movie');
  });

  it('Checking favorite film', function () {
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
      .get('input[id=is_favorite]')
      .check()
      .should('be.checked');

    cy.get('button').click();

    cy.contains(this.movie.title).within(() => {
      cy.get('span > i');
    });

    cy.visit('/movies/');

    cy.contains(this.movie.title).within(() => {
      cy.get('span > i');
    });
  });
});
