describe('Тестирование конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингридентов', () => {
    cy.contains('Краторная булка N-200i').parent().find('button').click();
    cy.get('[data-cy="burger-top"]').should(
      'contain.text',
      'Краторная булка N-200i (верх)'
    );
    cy.get('[data-cy="burger-bottom"]').should(
      'contain.text',
      'Краторная булка N-200i (низ)'
    );

    cy.contains('Говяжий метеорит (отбивная)').parent().find('button').click();
    cy.get('[data-cy="burger-ingredients"]').should(
      'contain.text',
      'Говяжий метеорит (отбивная)'
    );
  });
});
