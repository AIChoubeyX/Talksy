

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001"; // Replace with your backend URL

export const useAuthStore = create((set,get) => ({
  authUser: null, // yeh to hua huamra constant key
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [], // yeh humara online users ka array hai
  socket : null, // yeh humara socket hai

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); // idhar hum log set user kar diye
      get().connectSocket(); // Connect to socket after checking auth
    } catch (error) {
      console.log("Error checking auth", error);
      set({ authUser: null }); // idhar
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data }); // idhar
      get().connectSocket(); // Connect to socket after signup
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log("Error signing up", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");
      set({ authUser: res.data }); // idhar

      get().connectSocket(); // Connect to socket after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log("Error logging in", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null }); // idhar
      toast.success("Logged out successfully");
      get().disconnectSocket(); // Disconnect socket on logout
    } catch (error) {
      console.log("Error logging out", error);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      // console.log("error in update profile:", error);
      // toast.error(error.response.data.message);
          console.log("error in update profile:", error);
          console.log("error response:", error.response);
      // Show more detailed error
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  
  
  },

  connectSocket: () => {
    const {authUser} = get()
    if (!authUser || get().socket?.connected) return; // Don't connect if not authenticated
    const socket = io(BASE_URL,{
      query: { userId: authUser._id }, // Pass userId as a query parameter
      
    })
    socket.connect()
    set({ socket:socket});

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds })
    })
  },
      
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
 


}));

    