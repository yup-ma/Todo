//Creating shadow commponent for navbar so that with a tag only we can render navbar
const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `<div class="navbar-top"></div>
    <header class="navbar-container">
    <div id="user-action-status-messages">
    </div>
    <nav class="d-flex d-flex-just-space-btw">
        <a href="#" class="company-logo-container d-flex web-links" title="ToDo">
            <span class="company-logo d-flex"><i class="fa-solid fa-clipboard-list"></i></span>
            <span class="company-name">ToDO</span>
        </a>
        <div class="d-flex">
            <a href="#todo-container" class="web-links d-flex d-flex-just-cent"
                title="Add a task" data-nav-title="Add a task"">
                <span class="link-icon link-search-icon"><i class="fa-solid fa-square-plus"></i></span>
                <span class="link-text">Add task</span>
            </a>
            <a href="#todo-list" class="web-links d-flex d-flex-just-cent"
                title="Task lists" data-nav-title="Task lists"">
                <span class="link-icon link-search-icon"><i class="fa-solid fa-list-check"></i></span>
                <span class="link-text">Task list</span>
            </a>
            <a href="https://github.com/yup-ma/Todo" class="web-links d-flex d-flex-just-cent" target="_blank" title="Github link to repo"  data-nav-title="Github link to repo">
                <span class="link-icon"><i class="fa-brands fa-github"></i></span>
                <span class="link-text">Github</span>
            </a>
        </div>
    </nav>
</header>`;

class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(navbarTemplate.content);
        // const shadowRoot = this.attachShadow({ mode: 'closed' });
        // shadowRoot.appendChild(navbarTemplate.content);
    }
}

customElements.define('navbar-component', Navbar);