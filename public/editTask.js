const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const taskMemoDOM = document.querySelector(".task-edit-memo");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

//1つの特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name, memo } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    taskMemoDOM.value = memo;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};

showTask();

//タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskMemo = taskMemoDOM.value;
    taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      memo: taskMemo,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
