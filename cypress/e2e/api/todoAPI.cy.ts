const todo = {
  title: "새로 생성하는 투두 입니다.",
  description: "새로 생성한 투두의 설명 입니다.",
};
describe("todo api 테스트", () => {
  it("POST '/api/todo'", () => {
    cy.request("POST", "/api/todo", {
      title: todo.title,
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("title", todo.title);

      Cypress.env("todoId", res.body.id);
    });
  });

  it(`GET '/api/todo/[id]'`, () => {
    const id = Cypress.env("todoId");
    cy.request("GET", `/api/todo/${id}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("title", todo.title);
      expect(res.body).to.have.property("description", null);
      expect(res.body).to.have.property("id", id);
    });
  });

  it(`PUT '/api/todo/[id]'`, () => {
    const id = Cypress.env("todoId");
    cy.request("PUT", `/api/todo/${id}`, {
      description: todo.description,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("description", todo.description);
    });
  });

  it("GET '/api/todos'", () => {
    cy.request("/api/todos").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("todoList");
      const currentTodo = res.body.todoList[0];
      const id = Cypress.env("todoId");
      expect(currentTodo).to.have.property("title", todo.title);
      expect(currentTodo).to.have.property("description", todo.description);
      expect(currentTodo).to.have.property("id", id);
    });
  });

  it("DELETE '/api/todo/[id]'", () => {
    const id = Cypress.env("todoId");
    cy.request("DELETE", `/api/todo/${id}`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
