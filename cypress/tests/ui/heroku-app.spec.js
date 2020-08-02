/// <reference types="Cypress" />

context("Challenging DOM", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("h2").should("contain", "Available Examples");
  });

  it("Buttons ID's are changing dynamically after clicking red button", () => {
    cy.get("a").should("contain", "Challenging DOM");
    cy.get('a[href="/challenging_dom"]').click();

    cy.get("h3").should("contain", "Challenging DOM");
    cy.location("pathname").should("eq", "/challenging_dom");

    cy.get("a.success")
      .invoke("attr", "id")
      .then(($btn) => {
        // store the button's text
        //const txt = cy.wrap($btn).invoke("id")
        const txt = $btn;

        // submit a form
        cy.get(".alert").click();

        // compare the two buttons' text
        // and make sure they are different
        cy.get("a.success")
          .invoke("attr", "id")
          .then(($btn2) => {
            const txt2 = $btn2;
            expect(txt2).not.to.eq(txt);
            //expect(txt2).to.equal(txt)
          });
      });

    cy.get(".large-2 a").as("getel");
    cy.get(".large-2 a").each(($a, index) => {
      //var el = Array($a);
      cy.log(cy.wrap($a).invoke("attr", "id"));
    });
    cy.get(".alert").click();
    cy.get("@getel").each(($a) => {
      cy.log(cy.wrap($a).invoke("attr", "id"));
    });
    // cy.get(".large-2 a").each(($a) => {
    //   cy.log(cy.wrap($a).invoke("attr", "id").contains("@getel"));
    // });
  });

  it("Verify hello world", () => {
    cy.get("a").contains("Dynamic Loading").click();
    cy.url().should("include", "dynamic_loading");
    cy.get("h3").should("contain", "Dynamically Loaded Page Elements");
    cy.get("a").should("contain", "Example 2: Element rendered after the fact");

    cy.get('a[href="/dynamic_loading/2"]').click();
    cy.get("h3").should("contain", "Dynamically Loaded Page Elements");
    cy.get("h4").should(
      "contain",
      "Example 2: Element rendered after the fact"
    );
    cy.url().should("include", "dynamic_loading/2");

    cy.get("button").contains("Start").click();
    cy.get("h4").should("contain", "Hello World!");
  });
});
