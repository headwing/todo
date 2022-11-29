import { useState } from "react";
import "./App.css";

function App() {
  let [todo, setTodo] = useState([
    {
      id: 1,
      title: "리액트 공부",
      content: "리액트 공부를 해봅시다!",
      done: false,
    },
    { id: 2, title: "산책하기", content: "강아지랑 산책", done: true },
  ]);

  let [tempTitle, setTempTitle] = useState("");
  let [tempContent, setTempContent] = useState("");

  const addTodoHandler = () => {
    if ((tempTitle.length === 0) | (tempContent.length === 0)) {
      alert("값을 입력하세요!");
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: tempTitle,
        content: tempContent,
        done: false,
      };
      setTodo([...todo, newTodo]);
    }
  };

  const deleteTodoHandler = (id) => {
    const newTodoList = todo.filter((todo) => todo.id !== id);
    setTodo(newTodoList);
  };

  const changeTodoHandler = (id) => {
    const newTodoList = todo.filter((todo) => todo.id !== id);
    const changeTodo = todo.filter((todo) => todo.id === id)[0];
    changeTodo.done = !changeTodo.done;
    setTodo([...newTodoList, changeTodo]);
  };

  const clearInput = () => {
    let clear = document.getElementsByClassName("inputBox");
    for (let i = 0; i < clear.length; i++) {
      clear[i].value = "";
    }
    setTempTitle("");
    setTempContent("");
  };
  return (
    <div className="App">
      <header>My To DO List</header>

      <div className="input">
        <div className="inputContent">
          <span className="inputText">제목</span>
          <input
            className="inputBox"
            onChange={(e) => {
              setTempTitle(e.target.value);
            }}
          />
          <span className="inputText">내용</span>
          <input
            className="inputBox"
            onChange={(e) => {
              setTempContent(e.target.value);
            }}
          />
        </div>

        <button
          className="addButton"
          onClick={() => {
            addTodoHandler();
            clearInput();
          }}
        >
          추가!
        </button>
      </div>

      <div className="main">
        <div className="mainTitle">Working...🔥</div>
        <div className="mainContent">
          {todo
            .filter((todo) => todo.done === false)
            .map((working) => {
              return (
                <Todo
                  todo={working}
                  key={working.id}
                  handleDelete={deleteTodoHandler}
                  handleChange={changeTodoHandler}
                  change="완료"
                />
              );
            })}
        </div>
      </div>

      <div className="main">
        <div className="mainTitle">Done..!🎉</div>
        <div className="mainContent">
          {todo
            .filter((todo) => todo.done === true)
            .map(function (done) {
              return (
                <Todo
                  todo={done}
                  key={done.id}
                  handleDelete={deleteTodoHandler}
                  handleChange={changeTodoHandler}
                  change="취소"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function Todo(props) {
  return (
    <div className="mainContentindi">
      <h2>{props.todo.title}</h2>
      <p>{props.todo.content}</p>
      <div className="mainContentindiButton">
        <button onClick={() => props.handleDelete(props.todo.id)}>
          삭제하기
        </button>
        <button onClick={() => props.handleChange(props.todo.id)}>
          {props.change}
        </button>
      </div>
    </div>
  );
}
export default App;
