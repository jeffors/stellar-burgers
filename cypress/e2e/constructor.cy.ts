describe('Тестирование Stellar Burgers', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as(
      'postOrder'
    );
    cy.visit('http://localhost:4000/');
    cy.wait(['@getIngredients', '@getUser']);

    cy.setCookie('accessToken', 'Bearer fake.cypress.test');
    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'fake');
    });
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

  describe('Модальное окно ингридиента', () => {
    it('Открытие и закрытие на крестик', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
      const modal = cy.get('[data-cy="modal"]');
      modal.should('be.visible');
      modal.should('contain.text', 'Говяжий метеорит (отбивная)');
      modal.find('[data-cy="close-button"]').click();
      modal.should('not.exist');
    });

    it('Открытие и закрытие на оверлей', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
      const modal = cy.get('[data-cy="modal"]');
      modal.should('be.visible');
      modal.should('contain.text', 'Говяжий метеорит (отбивная)');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      modal.should('not.exist');
    });
  });

  it('Создание заказа', () => {
    cy.contains('Краторная булка N-200i').parent().find('button').click();
    cy.contains('Говяжий метеорит (отбивная)').parent().find('button').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');

    const modal = cy.get('[data-cy="modal"]');
    modal.should('be.visible');
    modal.should('contain.text', '55555');
    modal.find('[data-cy="close-button"]').click();
    modal.should('not.exist');
    cy.get('[data-cy="burger-top"]').should('contain.text', 'Выберите булки');
    cy.get('[data-cy="burger-bottom"]').should(
      'contain.text',
      'Выберите булки'
    );
    cy.get('[data-cy="burger-ingredients"]').should(
      'contain.text',
      'Выберите начинку'
    );
  });
});
