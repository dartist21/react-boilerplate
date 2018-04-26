export function openEditPage() {
  cy.visit('/movies/');

  cy
    .get('div[class*=MovieCard]')
    .first()
    .click();

  cy.contains('Edit movie').click();
}
