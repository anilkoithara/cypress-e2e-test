/// <reference types="Cypress" />
import * as homePage from './pages/home-page'

context("Challenging DOM", () => {
  beforeEach(() => {
    homePage.navigate("/")
    homePage.verifyHeaderText("Available Examples")
  });

  it("Button ID's are changing dynamically after clicking red button", () => {
    cy.get('a[href="/challenging_dom"]')
      .should("contain", "Challenging DOM")
      .click();
      homePage.verifyH3HeaderText("Challenging DOM")  
    cy.location("pathname").should("eq", "/challenging_dom");

    // get button ids before clicking
    cy.get("a.button").first().invoke("attr", "id").as("blueButtonIds");
    cy.get(".button.alert").invoke("attr", "id").as("redButtonIds");
    cy.get(".button.success").invoke("attr", "id").as("greenButtonIds");

    // click red button
    cy.get(".button.alert").click();

    //get button ids after clicking
    cy.get(".button")
      .first()
      .invoke("attr", "id")
      .as("blueButtonIdsAfterClick");
    cy.get(".button.alert").invoke("attr", "id").as("redButtonIdsAfterClick");
    cy.get(".button.success")
      .invoke("attr", "id")
      .as("greenButtonIdsAfterClick");

    //compare ids after clicking the red button
    cy.get("@blueButtonIdsAfterClick").then((blueBtn) => {
      cy.get("@blueButtonIds").should("not.eq", blueBtn);
    });
    cy.get("@redButtonIdsAfterClick").then((redBtn) => {
      cy.get("@redButtonIds").should("not.eq", redBtn);
    });
    cy.get("@greenButtonIdsAfterClick").then((greenBtn) => {
      cy.get("@greenButtonIds").should("not.eq", greenBtn);
    });
  });

  it("Verify Dynamically Loaded Page Elements", () => {
    cy.get("a").contains("Dynamic Loading").click();
    cy.location("pathname").should("eq", "/dynamic_loading");
    homePage.verifyH3HeaderText("Dynamically Loaded Page Elements")

    // click example 2 link
    cy.get('a[href="/dynamic_loading/2"]')
      .should("contain", "Example 2: Element rendered after the fact")
      .click();
    homePage.verifyH3HeaderText("Dynamically Loaded Page Elements")
    homePage.verifyH4HeaderText("Example 2: Element rendered after the fact")
    cy.get("h4").should("contain", "Example 2: Element rendered after the fact");
    cy.location("pathname").should("eq", "/dynamic_loading/2");

    // click start button
    cy.get("button").contains("Start").click();
    cy.get("#loading").should("be.visible");
    homePage.verifyH4HeaderText("Hello World!")
    cy.get("#loading").should("not.be.visible");
  });
});
