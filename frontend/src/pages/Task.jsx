import { useNavigate } from "react-router-dom";
import profile from "../assets/avatar.png";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import useTasksStore from "../store/tasksStore";
import useUserStore from "../store/userStore";

const Task = () => {
  const navigate = useNavigate();
  const { tasks, getTasks, addTask, deleteTask, taskDone } = useTasksStore();
  const { logoutUser, getUser, user } = useUserStore();

  useEffect(() => {
    getTasks();
    getUser();
  }, [getTasks, getUser]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: e.target.title.value,
    };

    addTask(newTask);

    e.target.reset();
  };

  const handleDone = (id) => {
    taskDone(id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div className="container flex justify-center items-center my-10">
      <div className="flex gap-3 flex-col md:flex-row w-full items-center md:items-start relative">
        {/* LEFT CARD */}
        <div className="bg-[#162039] p-10 rounded-xl flex items-center justify-center flex-col md:min-h-96 md:sticky md:top-3">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={user?.photo_url ? user?.photo_url : profile}
              alt="Profile Image"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="text-white my-2 text-sm text-center">
            Welcome back,{" "}
            <span className="font-semibold text-sm">{user?.name}!</span>
          </p>

          <div className="flex flex-col">
            <button
              className="bg-[#2C3A4A] text-white py-2 px-4 rounded-lg my-3 flex items-center justify-center hover:bg-[#2C3A4A]/75"
              onClick={() => navigate("/update-profile")}
            >
              <svg
                className="w-5 h-5 text-white mr-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                  fill="#FFFFFF"
                />
              </svg>
              Edit Profile
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-red-600/75"
              onClick={handleLogout}
            >
              <svg
                className="w-4 h-4 text-white mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#162039] p-10 rounded-xl flex justify-center flex-col w-full lg:w-9/12">
          <form className="flex flex-row gap-2 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a new task"
              className="text-white bg-transparent border border-[#D6B89D] sm:text-sm rounded-xl active:ring-primary active:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary block w-full py-2.5 px-3 caret-primary"
              name="title"
            />
            <button
              className="bg-primary text-white px-2 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-200"
              type="submit"
            >
              <svg
                fill="#ffffff"
                viewBox="0 0 24 24"
                id="plus"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  id="primary"
                  d="M12,20a1,1,0,0,1-1-1V13H5a1,1,0,0,1,0-2h6V5a1,1,0,0,1,2,0v6h6a1,1,0,0,1,0,2H13v6A1,1,0,0,1,12,20Z"
                ></path>
              </svg>
            </button>
          </form>

          <div className="my-12">
            <h5 className="text-white">
              Tasks to do -{" "}
              {tasks.filter((todo) => todo.isDone === false).length}
            </h5>

            {/* TASKS */}
            {tasks.filter((todo) => todo.isDone === false).length !== 0 ? (
              <>
                {tasks
                  .filter((todo) => todo.isDone === false)
                  .map((todo) => (
                    <div className="flex flex-col gap-4 mt-5" key={todo?._id}>
                      <Card
                        todo={todo?.title}
                        isDone={todo?.isDone}
                        onDone={() => handleDone(todo?._id)}
                        onDelete={() => handleDelete(todo?._id)}
                      />
                    </div>
                  ))}
              </>
            ) : (
              <p className="text-white text-sm text-center mt-5">
                No tasks to do.
              </p>
            )}
          </div>

          <div>
            <h5 className="text-white">
              Tasks done - {tasks.filter((todo) => todo.isDone === true).length}
            </h5>
            {/* TASKS */}
            {tasks.filter((todo) => todo.isDone === true).length !== 0 ? (
              <>
                {tasks
                  .filter((todo) => todo.isDone === true)
                  .map((todo) => (
                    <div className="flex flex-col gap-4 mt-5" key={todo?._id}>
                      <Card todo={todo?.title} isDone={todo?.isDone} />
                    </div>
                  ))}
              </>
            ) : (
              <p className="text-white text-sm text-center mt-5">
                No tasks have been completed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
