import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance as api } from "../config/axiosInstance";
import { showErrorToast, showSuccessToast } from "../components/Toast";

const useUserStore = create(
  persist((set) => ({
    user: null,
    email: null,
    password: null,
    isAuthenticated: false,
    token: null,

    loginUser: async (email, password) => {
      try {
        const response = await api.post("/users/login", {
          email,
          password,
        });

        if (response.success === true) {
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
          showSuccessToast({ text: "Login successful" });
        }
      } catch (error) {
        console.error(error);
        showErrorToast({ text: error.message });
      }
    },

    logoutUser: () => {
      try {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        showSuccessToast({ text: "Logout successful" });
      } catch (error) {
        console.error(error);
        showErrorToast({ text: error.message });
      }
    },

    getUser: async () => {
      const { token } = useUserStore.getState();
      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.success === true) {
          set({ user: response.data });
        }
      } catch (error) {
        console.error(error);
        // showErrorToast({ text: error.message });
      }
    },

    updateProfile: async (data) => {
      const { token } = useUserStore.getState();
      try {
        const response = await api.put("/users/profile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.success === true) {
          set({ user: response.data });
          showSuccessToast({ text: "Profile updated successfully" });
        }
      } catch (error) {
        console.error(error);
        showErrorToast({ text: error.message });
      }
    },
  }))
);

export default useUserStore;
