const url = `${Cypress.env("apiUrl")}`;

describe("Update Employee", function () {
  
  it("Update the employee details", function () {
    cy.request({
      method: "GET",
      url: `${url}/employees`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.of.at.least(1);
      const employeeID = response.body.data[0].id;

      cy.request({
        method: "PUT",
        url: `${url}/update/${employeeID}`,
        failOnStatusCode: false,
        body: {
          "profile_image": "My Self"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("success");
        expect(response.body.message).to.eq(
          "Successfully! Record has been updated."
        );
      });
    });
  });

  it("Expect 400 response for invalid employee details", function () {
    cy.request({
      method: "PUT",
      url: `${url}/update/^^%^`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
