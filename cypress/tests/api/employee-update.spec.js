/// <reference types="Cypress" />

const url = `${Cypress.env("apiUrl")}`;

describe("Update Employee", function () {
  it("Update employee details", function () {
    //request to get all the employee, basically next request will not run if this request fails,
    // in case of test performance issues we can remove this
    cy.request({
      method: "GET",
      url: `${url}/employees`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.of.at.least(1);

      const employeeID = response.body.data[0].id;
      const john = {
        employee_name: "John Doe",
        employee_salary: 50000,
        employee_age: 60,
        profile_image: "/john.png",
      };

      // update employee request
      cy.request({
        method: "PUT",
        url: `${url}/update/${employeeID}`,
        failOnStatusCode: false,
        body: john,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("success");
        expect(response.body.data).deep.eq(john);
        expect(response.body.message).to.eq(
          "Successfully! Record has been updated."
        );
      });
    });
  });

  //unhappy scenario
  it("Expect 400 response for invalid employee details", function () {
    cy.request({
      method: "PUT",
      url: `${url}/update/^^%%`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("400 Bad Request");
    });
  });
});
