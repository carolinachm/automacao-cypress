/// <reference types="cypress" />

describe('Ongs', () => {
    it.skip('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get('[placeholder="Nome da ONG"]').type('Dogs queridos');
        cy.get('[type="email"]').type('dogs@mail.com');
        cy.get('[placeholder="WhatsApp"]').type('51999999999');
        cy.get('[placeholder="Cidade"]').type('Porto Alegre');
        cy.get('[placeholder="UF"]').type('RS');

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

    it.skip('deve poder realizar um login no sistema', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });

    it.skip('deve realizar o logout', () => {
    //    cy.visit('http://localhost:3000/profile', {
    //        onBeforeLoad: (browser)=>{
    //         browser.localStorage.setItem('ongId', Cypress.env('createdOngId'));
    //         browser.localStorage.setItem('ongName', 'Gatos Queridos')
    //        }

    //    })
        
        cy.login();
        cy.get('.button').click();
       
    });
    it('deve poder realizar novos casos', ()=>{
        cy.login();
        cy.get('.button').click();
       cy.get('[placeholder="Título do caso"]').type('Animais maltratados');
       cy.get('textarea').type('animais precisando de ajuda para ser tratados');
       cy.get('[placeholder="Valor em reais"]').type(200);

       cy.route('POST', '**/incidents').as('newIncident');

       cy.get('.button').click();

       cy.wait('@newIncident').then((xhr) => {
           expect(xhr.status).to.eq(200);
           expect(xhr.response.body).has.property('id');
           expect(xhr.response.body.id).is.not.null;
       })
    });

    it('deve poder excluir um caso', () =>{
        cy.createNewIncident();
        cy.login();

        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        
        cy.get('li > button > svg').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        });
    })
});

//d2dab606