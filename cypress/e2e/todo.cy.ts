const todoLists = [
  {
    title: "1번 투두리스트 입니다.",
    description: "1번 투두리스트 설명 입니다.",
  },
  {
    title: "2번 투두리스트 입니다.",
    description: "2번 투두리스트 설명 입니다.",
  },
];

describe("todoList 기능 테스트", () => {
  const current = () => cy.dataCy("todo-list").dataCy("todo-item").first();

  beforeEach(() => cy.visit("/"));
  it("0.루트 경로 로딩 테스트 ", () => {
    cy.contains("랜딩 ");
  });

  it("투두 작성 테스트(엔터)", () => {
    cy.dataCy("todo-input").type(`${todoLists[1].title}`).type("{enter}");
    cy.wait(500);

    current().contains(todoLists[1].title);
  });

  it("투두 작성 테스트(버튼)", () => {
    cy.dataCy("todo-input").type(todoLists[0].title);
    cy.dataCy("todo-add-button").click();
    cy.wait(500);

    current().contains(todoLists[0].title);
  });

  it("투두 수정 테스트 (엔터)", () => {
    current().dataCy("todo-edit-button").click();
    current()
      .dataCy("todo-edit-input")
      .type(`변경된 ${todoLists[0].title}`)
      .type("{enter}");

    current().contains(`변경된 ${todoLists[0].title}`);
  });

  it("투두 수정 테스트 (버튼)", () => {
    current().dataCy("todo-edit-button").click();
    current()
      .dataCy("todo-edit-input")
      .type(todoLists[0].title)
      .type("{ enter }");
  });

  it("투두 수정 취소 테스트", () => {
    current().dataCy("todo-edit-button").click();
    current().dataCy("todo-edit-input").type(`변경된 ${todoLists[0].title}`);
    current().dataCy("todo-edit-back").click();
    current().contains(todoLists[0].title);
  });

  it("투두 클릭 테스트", () => {
    current().dataCy("todo-title").click();
    cy.wait(500);

    cy.url().contains("todo");
    cy.contains(todoLists[0].title);
  });

  it("/todo/[id] 뒤로 가기 테스트", () => {
    current().dataCy("todo-title").click();
    cy.wait(500);

    cy.url().contains("todo");
    cy.dataCy("back").click();
    cy.wait(500);

    current().contains(todoLists[0].title);
  });

  it("투두 삭제 테스트", () => {
    current().dataCy("todo-delete-button").click();
    cy.dataCy("delete-no").click();
    current().contains(todoLists[0].title);

    current().dataCy("delete-ok").click();
    cy.wait(500);

    current().contains(todoLists[0].title, { matchCase: false });
  });
});
