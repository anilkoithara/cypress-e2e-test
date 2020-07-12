/// <reference types="Cypress" />

context("Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Search, how many coronavirus cases in the world", () => {
    cy.get("input[name=q]")
      .type("how many coronavirus cases in the world")
      .type("{downarrow}{enter}");
    cy.contains("Daily change");
  });
});
