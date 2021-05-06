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
      const tiger = {
        employee_name: "Tiger Nixon",
        employee_salary: 320800,
        employee_age: 61,
        profile_image: "/tiger.png",
      };

      // update employee request
      cy.request({
        method: "PUT",
        url: `${url}/update/${employeeID}`,
        failOnStatusCode: false,
        body: tiger,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("success");
        expect(response.body.data).deep.eq(tiger);
        expect(response.body.message).to.eq(
          "Successfully! Record has been updated."
        );
      });
    });
  });

  //unhappy scenario
  it("Expect 404 response for invalid employee details", function () {
    cy.request({
      method: "PUT",
      url: `${url}/update/26/`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Error Occured! Page Not found, contact rstapi2example@gmail.com");
    });
  });
});
