import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    // Get tasks from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    // Add task
    const addTask = () => {
        if (task.trim() === "") {
            return;
        }

        fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: task
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Task sent to backend!");
                setTask("");
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    MERN Task Manager
                </h1>

                {/* Add Task */}
                <div className="flex gap-2 mb-8">

                    <input
                        type="text"
                        placeholder="Enter task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 border p-3 rounded-lg"
                    />

                    <button
                        onClick={addTask}
                        className="bg-blue-600 text-white px-5 rounded-lg"
                    >
                        Add
                    </button>

                </div>

                <h2 className="text-xl font-semibold mb-4">
                    Tasks
                </h2>

                {tasks.map((item) => (
                    <div
                        key={item.id}
                        className="border p-4 mb-3 rounded-lg"
                    >
                        {item.name}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default App;