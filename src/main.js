
import TodoList from './components/todolist/Todolist';



window.todoList= new TodoList({
  el: "#app",
  title: "My Amazing TodoList",
  apiURL: "https://6aa7f8589b08676cd32bb907.mockapi.io/",
});
window.todoList.render();