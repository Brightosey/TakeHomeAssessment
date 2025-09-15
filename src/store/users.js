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
  },
  actions: {
    setSelectedUser(user) {
      this.selectedUser = user;
    },
    async fetchUsers() {
      try {
        const request = await axios.get(this.baseUrl);
        console.log(request);
        this.users = request.data;
      } catch (error) {
        console.log("error fetching data");
      }
    },
    async fetchUserById(id) {
      try {
        const request = await axios.get(`${this.baseUrl}/${id}`);
        console.log(request.data);
        // this.users = request.data
      } catch (error) {
        console.log("error fetching data");
      }
    },
    async fetchUserByFirstName(payload) {
      try {
        const request = await axios.get(
          `${this.baseUrl}?First Name=${payload}`
        );
        console.log(request.data);
        // this.users = request.data
      } catch (error) {
        console.log("error fetching data");
      }
    },
    //     async fetchUsers() {
    //         try {
    //             const request = await axios.get(this.baseUrl);
    //             console.log(request);
    //             this.users = request.data
    //         } catch (error) {
    //             console.log("error fetching data")
    //         }
    //     }
  },
});

export default useUserStore;
