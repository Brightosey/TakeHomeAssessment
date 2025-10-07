import { defineStore } from "pinia";
import axios from "axios";

const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    selectedUser: null,
    baseUrl: `https://retoolapi.dev/Af7qT0/users`,
  }),
  getters: {
    getUsers() {
      return this.users;
    },
    companies() {
      return [...new Set(this.users.map((user) => user.company))];
    },
  },
  actions: {
    async fetchUsers() {
      try {
        const request = await axios.get(this.baseUrl);
        this.users = request.data;
      } catch (error) {
        console.log("error fetching data");
      }
    },
    async fetchUserById(id) {
      try {
        const request = await axios.get(`${this.baseUrl}/${id}`);
        this.selectedUser = request.data;
      } catch (error) {
        console.log("error fetching data");
      }
    },
    async fetchUserByFirstName(payload) {
      try {
        const request = await axios.get(
          `${this.baseUrl}?first_name_like=${payload}`
        );
      } catch (error) {
        console.log("error fetching data");
      }
    },
    async createUser(payload) {
      try {
        const request = await axios.post(this.baseUrl, payload);
        this.users.push(request.data);
        this.selectedUser = request.data;
        this.fetchUserById(request.data.id);
      } catch (error) {
        console.log("error creating user");
      }
    },

    async updateUser(id, payload) {
      try {
        const request = await axios.put(`${this.baseUrl}/${id}`, payload);
        this.users = this.users.map((user) =>
          user.id === id ? request.data : user
        );
        this.selectedUser = request.data;
      } catch (error) {
        console.log("error updating user");
      }
    },

    async patchUser(id, payload) {
      try {
        const request = await axios.patch(`${this.baseUrl}/${id}`, payload);
        return request.data;
      } catch (error) {
        console.log("error patching user");
      }
    },

    async deleteUser(id) {
      try {
        const request = await axios.delete(`${this.baseUrl}/${id}`);
        this.users = this.users.filter((user) => user.id !== id);
        return request.data;
      } catch (error) {
        console.log("error deleting user");
      }
    },
  },
});

export default useUserStore;
