// Basic example page object
export function navigate(url){
    cy.visit(url)
}

export function verifyHeaderText(text){
    cy.get("h2").should("contain", text);
}

export function verifyH3HeaderText(text){
    cy.get("h3").should("contain", text);
}

export function verifyH4HeaderText(text){
    cy.get("h4").should("contain", text);
}