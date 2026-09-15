import DB from '../../DB';
import Todo from '../todo/Todo';
import getTemplate from './template';

export default class TodoList {
    constructor(data) {
    DB.setApiURL(data.apiURL);
    this.title = data.title ?? "My Todolist";
    this.domElt = document.querySelector(data.el);
    this.todos = [];
    }
    
    
    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = [...todos.map((todo) => new Todo(todo))];
        console.table(this.todos);
    }

    async render() {
       await this.loadTodos();
        this.domElt.innerHTML = getTemplate(this);
    }
}