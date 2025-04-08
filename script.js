document.addEventListener("DOMContentLoaded", () => {
  const createInput = document.getElementById("createNew");
  const create = document.querySelector(".create");
  const foot = document.querySelector(".foot");
  const todosContainer = document.querySelector(".todos");
  const noTodosMessage = document.querySelector(".no-todos-message");
  const itemsLeftDisplay = document.querySelector(".items-left");
  const filterButtons = document.querySelectorAll(".buttons .filter-btn");
  const side = document.querySelectorAll(".side");
  const list = document.querySelector(".list");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const sunIcon = document.querySelector("#sun");
  const container = document.querySelector(".container");
  const buttons = document.querySelector('.foot .buttons');
  const hideButtons = document.getElementById("sm");
  const fot = document.querySelector(".fot");
  const backgroundImg = document.querySelector("#background");
  let currentFilter = "all";
  let isDarkMode = false;

  const updateUI = () => {
    const todos = [...todosContainer.querySelectorAll(".todo")];
    const activeCount = todos.filter(
      (todo) => !todo.classList.contains("completed")
    ).length;
    const completedCount = todos.length - activeCount;

    itemsLeftDisplay.textContent = `${activeCount} items left`;

    if (todos.length === 0) {
      noTodosMessage.textContent = "Hurray! You have completed the tasks";
      noTodosMessage.style.display = "block";
    } else if (completedCount === 0 && todos.length > 0) {
      noTodosMessage.textContent = "You haven't completed any tasks";
      noTodosMessage.style.display = "block";
    } else {
      noTodosMessage.style.display = "none";
    }

    filterTodos(currentFilter);
    sunIcon.src = isDarkMode
      ? "./images/icon-sun.svg"
      : "./images/icon-moon.svg";
    backgroundImg.src = isDarkMode
      ? "./images/bg-desktop-dark.jpg"
      : "./images/bg-desktop-light.jpg";
    if (isDarkMode) {
      sunIcon.classList.remove("rotate");
    } else {
      sunIcon.classList.add("rotate");
    }
    createInput.style.backgroundColor = isDarkMode ? "#26263D" : "white";
    createInput.style.color = isDarkMode ? "white" : "black";
    list.style.backgroundColor = isDarkMode ? "#26263D" : "white";
    list.style.boxShadow = isDarkMode
      ? "2px 4px 6px rgba(0, 0, 0, 0.3), -2px 4px 6px rgba(0, 0, 0, 0.3)"
      : "2px 4px 6px rgba(0, 0, 0, 0.1), -2px 4px 6px rgba(0, 0, 0, 0.1)";
    create.style.boxShadow = isDarkMode
      ? "2px 4px 6px rgba(0, 0, 0, 0.3), -2px 4px 6px rgba(0, 0, 0, 0.3)"
      : "2px 4px 6px rgba(0, 0, 0, 0.1), -2px 4px 6px rgba(0, 0, 0, 0.1)";
    fot.style.boxShadow = isDarkMode
      ? "2px 4px 6px rgba(0, 0, 0, 0.3), -2px 4px 6px rgba(0, 0, 0, 0.3)"
      : "2px 4px 6px rgba(0, 0, 0, 0.1), -2px 4px 6px rgba(0, 0, 0, 0.1)";
    container.style.backgroundColor = isDarkMode ? "#181824" : "white";
    create.style.backgroundColor = isDarkMode ? "#26263D" : "white";
    side.forEach((button) => {
        button.style.color = isDarkMode ? "white" : "black";
      });
    filterButtons.forEach((button) => {
      button.style.color = isDarkMode ? "white" : "black";
    });

    // Dynamically query all .todo-text elements and update their color
    const allTodoTexts = document.querySelectorAll(".todo-text");
    allTodoTexts.forEach((text) => {
      text.style.color = isDarkMode ? "white" : "black";
    });
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    if (isSmallScreen) {
      buttons.classList.add("disabled");
      hideButtons.style.display = "flex";
      fot.style.display = "block";
      hideButtons.style.backgroundColor = isDarkMode ? "#26263D" : "white";
      fot.style.backgroundColor = isDarkMode ? "#26263D" : "white";
      foot.style.backgroundColor = isDarkMode ? "#26263D" : "white";
      foot.classList.add("smallscreen");
    } else {
      buttons.classList.remove("disabled");
      hideButtons.style.display = "none";
      foot.classList.remove("smallscreen");
    }
  };

  const toggleTodo = (todo, checkbox, text) => {
    checkbox.addEventListener("change", () => {
      todo.classList.toggle("completed", checkbox.checked);
      text.classList.toggle("completed", checkbox.checked);
      updateUI();
    });
  };

  const createTodo = (text) => {
    const todo = document.createElement("div");
    todo.className = "todo";

    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "custom-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = `checkbox-${Date.now()}`;

    const label = document.createElement("label");
    label.className = "label";
    label.setAttribute("for", checkbox.id);

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = text;
    // Removed: todoText.style.color = isDarkMode ? "white" : "black"; (Handled by updateUI)

    checkboxDiv.append(checkbox, label);
    todo.append(checkboxDiv, todoText);

    toggleTodo(todo, checkbox, todoText);
    return todo;
  };

  createInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && createInput.value.trim()) {
      const newTodo = createTodo(createInput.value.trim());
      todosContainer.append(newTodo, document.createElement("hr"));
      createInput.value = "";
      updateUI();
    }
  });

  const filterTodos = (filter) => {
    const todos = todosContainer.querySelectorAll(".todo");
    let visibleCount = 0;

    todos.forEach((todo) => {
      const hr =
        todo.nextElementSibling?.tagName === "HR"
          ? todo.nextElementSibling
          : null;
      const isCompleted = todo.classList.contains("completed");
      const show =
        filter === "all" ||
        (filter === "active" && !isCompleted) ||
        (filter === "completed" && isCompleted);

      todo.style.display = show ? "flex" : "none";
      if (hr) hr.style.display = show ? "block" : "none";
      if (show) visibleCount++;
    });

    if (visibleCount === 0) {
      if (filter === "completed") {
        noTodosMessage.textContent = "You haven't completed any tasks";
      } else if (filter === "active") {
        noTodosMessage.textContent = "Hurray! You have completed all tasks";
      } else {
        noTodosMessage.textContent = "Hurray! You have completed the tasks";
      }
      noTodosMessage.style.display = "block";
    } else {
      noTodosMessage.style.display = "none";
    }
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Filter button clicked:', btn, 'Parent:', btn.parentElement); // Debug log
        // Only apply filter logic if the button is in the visible container
        const isInMainButtons = btn.parentElement === buttons;
        const isInSmallScreenButtons = btn.parentElement === hideButtons;
        const isMainButtonsDisabled = buttons.classList.contains('disabled');

        if (isInMainButtons && !isMainButtonsDisabled || isInSmallScreenButtons && isMainButtonsDisabled) {
            filterButtons.forEach(b => b.classList.remove('active'));
            // Highlight the corresponding button in both sets
            const filterValue = btn.dataset.filter;
            filterButtons.forEach(b => {
                if (b.dataset.filter === filterValue) {
                    b.classList.add('active');
                }
            });
            currentFilter = filterValue;
            filterTodos(currentFilter);
            updateUI();
        }
    });
});
  clearCompletedBtn.addEventListener("click", () => {
    todosContainer.querySelectorAll(".todo.completed").forEach((todo) => {
      const hr =
        todo.nextElementSibling?.tagName === "HR"
          ? todo.nextElementSibling
          : null;
      todo.remove();
      if (hr) hr.remove();
    });
    updateUI();
  });

  todosContainer.querySelectorAll(".todo").forEach((todo) => {
    const checkbox = todo.querySelector(".todo-checkbox");
    const text = todo.querySelector(".todo-text");
    toggleTodo(todo, checkbox, text);
  });

  sunIcon.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    updateUI();
  });

  updateUI();
});
