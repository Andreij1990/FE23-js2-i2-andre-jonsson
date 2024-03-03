import displayTasks from "./modules/displayTasks.js";
import { getTasks, postTask, patchTask, deleteTask } from "./modules/fetchFunctions.js";

const form = document.querySelector('form');
const tasksDiv = document.querySelector('#taskContainer');

form.addEventListener('submit', event=>{
    event.preventDefault();

    const newTask = {
        task: form.querySelector('input').value,
        category: form.querySelector('select').value,
        status: "to do",
        assigned: "none"
    }
    form.reset();

    postTask(newTask).then(()=>{
        getTasks().then(displayTasks)
    })
})

tasksDiv.addEventListener('click', ({ target }) => {
    if (target.id !== 'taskContainer') {

        let id;
        let status;
        let assigned;

        if (target.id === "") {
            id = target.closest('div').id;
        } else {
            id = target.id;
        }

        if (target.classList.contains('deleteButton')) {
            const id = target.closest('div').id;
    
            deleteTask(id).then(() => {
                getTasks().then(displayTasks);
            });
        } else if(target.classList.contains('todoButton')) {
            const startStatus = status === 'done' ? 'done' : 'to do';

            patchTask(id, startStatus, assigned).then(() => {
                getTasks().then(displayTasks);
            });
         } else if(target.classList.contains('startedButton')) {
            const newStatus = status === 'to do' ? 'to do' : 'in progress';
            const assignForm = target.closest('form');
            
            const assignment = assignForm.querySelector('input').value;
            patchTask(id, newStatus, assignment).then(() => {
                getTasks().then(displayTasks);
            });
        } else if(target.classList.contains('doneButton')){
            const endStatus = status === 'in progress' ? 'in progress' : 'done';

            patchTask(id, endStatus, assigned).then(() => {
                getTasks().then(displayTasks);
            });
         }    
    }
});

getTasks().then(displayTasks)