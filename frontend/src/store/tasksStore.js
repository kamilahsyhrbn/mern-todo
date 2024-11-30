import { create } from "zustand";
import { axiosInstance as api } from "../config/axiosInstance";
import useUserStore from "./userStore";
import { showErrorToast, showSuccessToast } from "../components/Toast";

const useTasksStore = create((set) => ({
  tasks: [],
  getTasks: async () => {
    const { token } = useUserStore.getState();
    try {
      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ tasks: response.data });
    } catch (error) {
      console.error(error);
      //   showErrorToast({ text: "Something went wrong" });
    }
  },
  addTask: async (task) => {
    const { token } = useUserStore.getState();
    const { tasks } = useTasksStore.getState();
    try {
      const response = await api.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.success === true) {
        set({ tasks: [...tasks, response.data] });
        showSuccessToast({ text: "Task added successfully" });
      }
    } catch (error) {
      console.log(error);
      showErrorToast({ text: "Something went wrong" });
    }
  },

  deleteTask: async (id) => {
    const { token } = useUserStore.getState();
    const { tasks } = useTasksStore.getState();
    try {
      const response = await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.success === true) {
        set({ tasks: tasks.filter((task) => task._id !== id) });
        showSuccessToast({ text: "Task deleted successfully" });
      }
    } catch (error) {
      console.log(error);
      showErrorToast({ text: "Something went wrong" });
    }
  },

  taskDone: async (id) => {
    const { token } = useUserStore.getState();
    const { tasks } = useTasksStore.getState();
    try {
      const response = await api.patch(
        `/tasks/${id}/done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.success === true) {
        set({
          tasks: tasks.map((task) =>
            task._id === id ? { ...task, isDone: !task.isDone } : task
          ),
        });
      }
    } catch (error) {
      console.log(error);
      showErrorToast({ text: "Something went wrong" });
    }
  },
}));

export default useTasksStore;
