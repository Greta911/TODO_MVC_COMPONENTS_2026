export default function getTemplate(todoList) {
    return `
    <ul>${todoList.todos.map((todo) => todo.render()).join("")}</ul>
    `;
}