import { openEditPage } from '../helpers';

function submitAndCheckLocation() {
  cy.get('form').submit();
  cy.location('pathname').should('contains', 'edit');
}

describe('Validating form test', () => {
  beforeEach(() => {
    cy.fixture('movie').as('movie');
  });

  it('validating form', function () {
    openEditPage();

    cy.get('input[name=title]').clear();
    submitAndCheckLocation();
    cy.get('input[name=title]').type(this.movie.title);

    cy.get('input[name=poster]').clear();
    submitAndCheckLocation();
    cy.get('input[name=poster]').type('Not valid poster');
    submitAndCheckLocation();
    cy
      .get('input[name=poster]')
      .clear()
      .type(this.movie.poster);

    cy.get('textarea[name=description]').clear();
    submitAndCheckLocation();
    cy.get('textarea[name=description]').type(this.movie.description);

    cy.get('input[name=year]').clear();
    submitAndCheckLocation();
    cy.get('input[name=year]').type('Not valid year');
    submitAndCheckLocation();
    cy
      .get('input[name=year]')
      .clear()
      .type(this.movie.year);

    cy.get('input[name=director]').clear();
    submitAndCheckLocation();
    cy.get('input[name=director]').type(this.movie.director);

    cy.get('form').submit();
    cy.location('pathname').should('not.contains', 'edit');
  });
});
