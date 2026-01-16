import './App.css';
import { useState } from 'react';

function App() {
  const [task, settask] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("");
  const [edit, setedit] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sort, setsort] = useState("");

  function addTask() {
    if (!title || !description || !priority) {
      alert("Title and Description and Priority are required!");
      return;
    }
    if (edit !== null) {
      const update = [...task];
      update[edit].title = title;
      update[edit].description = description;
      settask(update);
      setedit(null);
    }
    else {
      settask([...task, { title, description, priority, completed: false }])
    }
    settitle("");
    setdescription("");
    setpriority("");
  }
  function update(index) {
    settitle(task[index].title);
    setdescription(task[index].description);
    setpriority(task[index].priority);
    setedit(index)
  }

  function del(index) {
    const nTask = [];
    for (var i = 0; i < task.length; i++) {
      if (i !== index) {
        nTask.push(task[i])
      }
    }
    settask(nTask);
  }
  function complete(index) {
    const ucom = [...task];

    if (ucom[index].completed)
      return;

    ucom[index].completed = true;
    settask(ucom);
  }

  let filterTask = [];
  if (filter === "All") {
    filterTask = [...task];
  }
  else if (filter === "Active") {
    filterTask = task.filter(t => !t.completed);
  }
  else if (filter === "Completed") {
    filterTask = task.filter(t => t.completed);
  }

  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  if (sort === "LTH") {
    filterTask.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }
  else if (sort === "HTL") {
    filterTask.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }


  return (
    <div className="App">
      <div className='main'>
        <h1>To-Do List</h1>

        <div className='inner'>
          <input type='text' id='title' placeholder="Task Title" value={title} onChange={(e) => settitle(e.target.value)}></input>
          <input type='text' id='description' placeholder="Task Description" value={description} onChange={(e) => setdescription(e.target.value)}></input>
          <select id="priority" value={priority} disabled={edit !== null} onChange={(e) => setpriority(e.target.value)}>
            <option value="" disabled>
              Select Priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type='submit' onClick={addTask}>{edit !== null ? "Update Task" : "Add Task"}</button>
        </div>

        <div className='filter'>
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
          <select value={sort} onChange={(e) => setsort(e.target.value)}>
            <option value={""} selected>Sort by Priority</option>
            <option value={"LTH"}>Low to Hight</option>
            <option value={"HTL"}>Hight to low</option>
          </select>
        </div>

        <div className="list-container">
          <div className='table-wraped'>
            <table border="0" width="100%" cellPadding={10} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  filterTask.map((val, index) => (
                    <tr key={index} style={{ textDecoration: val.completed ? "line-through" : "none", color: val.completed ? "#426acf" : "black" }}
                    >
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.priority}</td>
                      <td>
                        <button onClick={() => update(index)}>Edit</button>
                        <button onClick={() => del(index)}>Delete</button>
                        <button onClick={() => complete(index)}>Complete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
