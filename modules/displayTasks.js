export default function displayTasks(tasks) {
    const toDoContainer = document.querySelector('#toDoContainer');
    const inProgressContainer = document.querySelector('#inProgressContainer');
    const doneContainer = document.querySelector('#doneContainer');

    //const categorySelector = document.getElementById("category").value;    

    toDoContainer.innerHTML = '';
    toDoContainer.appendChild(createHeader('To do'));
    
    inProgressContainer.innerHTML = '';
    inProgressContainer.appendChild(createHeader('In progress'));

    doneContainer.innerHTML = '';
    doneContainer.appendChild(createHeader('Done'));

    Object.entries(tasks).forEach(([id, taskObj]) => {
        const taskCard = createAndAppend('div');
        const h3 = createAndAppend('h3', taskCard, taskObj.task);
        const taskSection = document.createElement('section');

        taskCard.id = id;
        taskCard.classList.add('task');
        taskCard.classList.add(getStatusClass(taskObj.status));
        taskCard.classList.add(getCategoryClass(taskObj.category));

        if (taskObj.status === 'to do') {
            taskCard.appendChild(taskSection);
            const assignForm = createAndAppend('form', taskSection, null);

            const assignInput = createAndAppend('input', assignForm);
            assignInput.classList.add('assignInput');

            const startedButton = createAndAppend('button', assignForm, 'Assign >>');
            startedButton.type = 'submit';
            startedButton.classList.add('startedButton');

            assignForm.addEventListener('submit', (event) => {
                event.preventDefault();
            });
            toDoContainer.appendChild(taskCard);
        }
       else if (taskObj.status === 'in progress'){
        const pEl = createAndAppend('p', taskCard, taskObj.assigned);
        taskCard.appendChild(taskSection);
        const todoButton = createAndAppend('button', taskSection, '<< Unassign');
        todoButton.classList.add('todoButton');

        const doneButton = createAndAppend('button', taskSection, 'Done >>');
        doneButton.classList.add('doneButton');
        inProgressContainer.appendChild(taskCard);
    } else {
        const pEl = createAndAppend('p', taskCard, taskObj.assigned);
        h3.classList.add('deletedItem');
        const deleteButton = createAndAppend('button', taskCard, 'Delete');
        deleteButton.classList.add('deleteButton');
        doneContainer.appendChild(taskCard);
    }
       /* doneButton.addEventListener('click', () => {
            const currentStatus = taskObj.status;
            const newStatus = getNextStatus(currentStatus);
            taskCard.classList.remove(getStatusClass(currentStatus));
            taskCard.classList.add(getStatusClass(newStatus));
            taskObj.status = newStatus;
        });*/
    });
}

function createAndAppend(type, container, content) {
    const el = document.createElement(type);
    if (container) {
        if (type !== 'div') el.innerText = content;
        container.append(el);
    }
    return el;
}

function getStatusClass(status) {
    const classMap = {
        'to do': 'to-do',
        'in progress': 'in-progress',
        'done': 'done',
    };

    return classMap[status];
}

/*function getNextStatus(currentStatus) {
    const statusOrder = ['to do', 'in progress', 'done'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex];
}*/

function getCategoryClass(category) {
    const categoryClassMap = {
        'ux': 'ux',
        'dev frontend': 'dev-frontend',
        'dev backend': 'dev-backend'
    };

    return categoryClassMap[category];
}

function createHeader(title) {
    const headerTitle = document.createElement('h2');
    headerTitle.classList.add('headerTitle');
    headerTitle.innerHTML = title;
    return headerTitle;
}