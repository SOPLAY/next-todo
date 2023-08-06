# Next.js Todo 연습용 레포 입니다.

## 구현된 API 요약

- API
  - /todos
    - (GET) : 작성된 todoList를 불러옵니다 ( 페이지 네이션 없이 모든 리스트를 불러옵니다. )
  - /todo
    - (POST) : 새로운 todo를 작성합니다.
  - /todo/[id]
    - (GET) : 해당 id의 todo 상세 정보를 가져옵니다.
    - (PUT) : 해당 id의 todo 를 수정합니다.
    - (DELETE) : 해당 id의 todo를 제거합니다.성

## 프로젝트 개발 서버 시작 방법

1. 의존성 설치

```shell
yarn
```

2. DB 마이그레이션

```shell
yarn migrate
```

3. 개발 서버 실행

```shell
yarn dev
```

## 요구사항

1. `/` 루트 경로 요구사항
   - [ ] todo List를 추가 할 수 있는 input이 있어야 합니다.
     - [ ] input에서 입력 도중 `"Enter"`를 입력할 경우 입력중이던 내용을 투두에 추가합니다. ( 추가시 input은 공백으로 변해야 합니다.)
   - [ ] todo List를 확인 할 수 있습니다
     - [ ] 각각의 todo 는 title 만 표시되어야 합니다.
     - [ ] 각각의 todo 는 title 영역을 클릭할 시 `"/todo/고유id"` 경로로 이동됩니다.
     - [ ] 각각의 todo 는 완료 여부를 확인할 수 있어야 합니다.
     - [ ] 각각의 todo 는 수정 할 수 있어야 합니다.
       - [ ] 수정 모드 진입시 이를 취소해서 원상태로 돌아갈 수 있어야 합니다.
       - [ ] 완료 상태의 경우 내용 수정과 별도로 수정할 수 있어야 합니다.
     - [ ] 각각의 todo 는 삭제 할 수 있어야 합니다.
     - [ ] 완료된 todo들을 일괄 삭제 할 수 있습니다.
2. `/todo/[todoId]` ( Next.js의 페이징을 이해하셨나 테스트 하기 위한 테스트 이므로 ui는 간단하게 넘어가시면 됩니다.)
   - [ ] 해당 todoId의 todo에 대한 title 과 description을 확인 할 수 있습니다.
   - [ ] 수정 버튼을 클릭시 `"/todo/[todoId]/edit"` 경로로 이동 됩니다.
   - [ ] 삭제 버튼 클릭시 삭제가 됩니다
     - [ ] 만약 삭제를 할 경우 `/` 경로로 이동 됩니다.
3. `/todo/[todoId]/edit` ( Next.js의 페이징을 이해하셨나 테스트 하기 위한 테스트 이므로 ui는 간단하게 넘어가시면 됩니다.)
   - [ ] 제목, 설명, 완료 여부를 수정 할 수 있어야 합니다.
   - [ ] edit 모드를 취소 하거나 수정 할 경우 `todo/[todoId]`로 다시 돌아갑니다.
   - [ ] 삭제 버튼 클릭시 삭제가 됩니다
     - [ ] 만약 삭제를 할 경우 `/` 경로로 이동 됩니다.

## API 정의

### /todo

> #### todo 생성

```http request
POST /api/todo
```

body

| Parameter   | Type    | Description                           |
| :---------- | :------ | :------------------------------------ |
| title       | string  | todo의 제목 입니다                    |
| description | ?string | 생략이 가능한 todo의 세부설명 입니다. |

response

```json
{
  "id": "clky70vhx0013bh04xb7g86ql",
  "title": "투두 타이틀 입니다",
  "description": null,
  "completed": false,
  "createdAt": "2023-08-05T15:52:20.854Z",
  "updatedAt": "2023-08-05T15:52:20.854Z"
}
```

### /todo/[todoId]

`여기서의 [todoId]는 각각 todoItem의 고유한 id입니다.`  
위의 예시와 같은 id라면 요청 주소는 `api/todo/clky70vhx0013bh04xb7g86ql` 가 됩니다.

> #### todo 조회

```http request
GET /api/todo/[todoId]
```

response

```json
{
  "id": "clky70vhx0013bh04xb7g86ql",
  "title": "투두 타이틀 입니다",
  "description": null,
  "completed": false,
  "createdAt": "2023-08-05T15:52:20.854Z",
  "updatedAt": "2023-08-05T15:52:20.854Z"
}
```

> #### todo 변경

```http request
PUT /api/todo/[todoId]
```

body

`body의 모든 파라미터는 생략 가능합니다.`

| Parameter   | Type     | Description                      |
| :---------- | :------- | :------------------------------- |
| title       | ?string  | 변경할 todo 제목 입니다          |
| description | ?string  | 변경할 todo 세부 설명 입니다.    |
| completed   | ?boolean | 변경할 todo 의 완료 상태 입니다. |

response

```json
{
  "id": "clky70vhx0013bh04xb7g86ql",
  "title": "변경된 투두 타이틀 입니다.",
  "description": "변경된 투두 타이틀 입니다.",
  "completed": true,
  "createdAt": "2023-08-05T15:52:20.854Z",
  "updatedAt": "2023-08-05T15:54:22.854Z"
}
```

> #### todo 삭제

```http request
DELETE /api/todo/[todoId]
```

response

```json
{
  "message": "success"
}
```

---

### /todos

> #### todo list 조회

```http request
GET /api/todos
```

response

```json
{
  "todoList": [
    {
      "id": "clky70vhx0013bh04xb7g86ql",
      "title": "투두 타이틀 입니다",
      "description": null,
      "completed": false,
      "createdAt": "2023-08-05T15:52:20.854Z",
      "updatedAt": "2023-08-05T15:52:20.854Z"
    },
    ...
  ]
}
```
