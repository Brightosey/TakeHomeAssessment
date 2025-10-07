<script setup>
import { storeToRefs } from "pinia";
import useUserStore from "../store/users";
import Filter from "./Filter.vue";
import { ref, computed } from "vue";

const emit = defineEmits(["create-user"]);
const userStore = useUserStore();
const { users, selectedUser } = storeToRefs(userStore);
const isFilterMode = ref(false);
const fistname = ref("");
const lastname = ref("");
const filter = ref("");

const selectUser = async (user) => {
  await userStore.fetchUserById(user.id);
};

const filteredUsers = computed(() => {
  if (isFilterMode.value) {
    return users.value.filter((user) => user.first_name.includes(fistname.value) && user.last_name.includes(lastname.value) && user.plan.includes(filter.value));
  }
  return users.value;
});

const applyFilters = (filteredUsers) => {
  isFilterMode.value = true;
  fistname.value = filteredUsers.firstName;
  lastname.value = filteredUsers.lastName;
  filter.value = filteredUsers.filter;
};

const resetFilters = () => {
  isFilterMode.value = false;
};
</script>

<template>
  <aside class="sidebar">
    <Filter @apply-filters="applyFilters" @reset-filters="resetFilters" /><br></br>
    <ul class="list">
      <li
      class="list-content"
        v-for="user in filteredUsers"
        :key="user.id"
        @click="selectUser(user)"
        :class="{ active: selectedUser && selectedUser.id === user.id }"
      >
        {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>

    <button class="new-btn" @click="emit('create-user')">
      + Create New User
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 90vh;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  background: #f8faff;
  border-right: 1px solid #ddd;
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
  width: calc(100% - 3rem);
}
.new-btn:hover {
  background: #1259a5;
}
</style>