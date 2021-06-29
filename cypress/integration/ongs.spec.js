/// <reference types="cypress" />

describe('Ongs', () => {

    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get('[placeholder="Nome da ONG"]').type('Dogs queridos');
        cy.get('[type="email"]').type('teste@mail.com');
        cy.get('[placeholder="WhatsApp"]').type('61999999999');
        cy.get('[placeholder="Cidade"]').type('valparaiso');
        cy.get('[placeholder="UF"]').type('go');

        // routing
        // start server com cy.server()
        // criar uma rota com cy.route()
        // atribuir rota a um alias
        // esperar com cy.wait e fazer uma validação

        cy.route('POST', '**/ongs').as('postOng');
        cy.get('.button').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });

    });

    it('deve poder realizar um login no sistema', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });
    
    it('deve poder fazer logout'), ()=> {

    }
});