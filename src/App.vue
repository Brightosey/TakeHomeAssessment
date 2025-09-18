<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import SideBar from "./component/SideBar.vue";
import UserDetail from "./component/UserDetail.vue";
import UserFormModal from "./component/UserFormModal.vue";
import useUserStore from "./store/users";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const showModal = ref(false);

const fetchUsers = () => {
  return userStore.fetchUsers();
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <main class="layout">
    <SideBar class="sidebar" @create-user="showModal = true" />
    <UserDetail class="detail" />
    <UserFormModal v-if="showModal" @close="showModal = false" />
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  width: 100%;
  min-height: 100%;
}

.sidebar {
  width: 30%; 
  flex-shrink: 0; 
  border-right: 1px solid #ddd;
}

.detail {
  width: 70%; 
  padding: 1rem;
  background: #f9fbfd;
  height: 90vh;
}
</style>
