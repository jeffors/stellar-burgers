describe('Тестирование конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients')
    cy.visit('http://localhost:4000/')
    cy.wait('@getIngredients')
  })
  
  // для теста, потом убрать
  it('Открытие конструктора', () => {
    const header = cy.get('[data-cy="constructor-header"]')
    header.contains('Соберите бургер')
  })
})