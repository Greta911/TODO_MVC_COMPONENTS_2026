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
    storeInArray(todo) {
        this.todos.push(new Todo(todo));
    }

    storeInDOM(data) {
        const newTodo= document.createElement('div');
        this.domElt.querySelector('.todo-list').prepend(newTodo);
        newTodo.outerHTML= this.todos.filter((todo) => todo.id == data.id) [0].render();
    }


    async store(data) {
        // Ajouter dans l'API via DB.store()
        const newTodo =  await DB.store({content: data, completed: false})
        // Ajouter dans les todos via this.storeInArray()
        this.storeInArray(newTodo);
        // Ajouter dans le DOM via this.
        this.storeInDOM(newTodo);
    }
}