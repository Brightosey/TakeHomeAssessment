<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useUserStore from "../store/users";

const emit = defineEmits(["create-user"]);
const userStore = useUserStore();
const { users, selectedUser } = storeToRefs(userStore);

const search = ref("");

const handleSearch = () => {
  if (search.value) {
    userStore.fetchUserByFirstName(search.value);
  } else {
    userStore.fetchUsers();
  }
};

const selectUser = (user) => {
  userStore.setSelectedUser(user);
};
</script>

<template>
  <aside class="sidebar">
    <div class="header">
      <span>Filter Users</span>
    </div>

    <input
      class="search"
      v-model="search"
      placeholder="Search by name..."
      @input="handleSearch"
    />

    <ul class="list">
      <li
      class="list-content"
        v-for="user in users"
        :key="user.id"
        @click="selectUser(user)"
        :class="{ active: selectedUser && selectedUser.id === user.id }"
      >
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>

    <button class="new-btn" @click="$emit('create-user')">
      + Create New User
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8faff;
  border-right: 1px solid #ddd;
}

.header {
  background: #1976d2;
  color: #fff;
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 14px;
}

.search {
  margin: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: calc(100% - 1.5rem);
}

.list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  background: #f8faff;
}

.list-content{
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.list-content:hover {
  background: #f0f7ff;
}
.list-content.active {
  background: #e3f0ff;
  color: #1976d2;
  font-weight: 600;
}

.new-btn {
  margin: 1rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.6rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
.new-btn:hover {
  background: #1259a5;
}
</style>
