<!-- <script setup>
import SideBar from "./components/SideBar.vue";
import UserDetail from "./components/UserDetail.vue";
import UserFormModal from "./components/UserFormModal.vue";

import useUserStore from "./store/users";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const userStore = useUserStore();

const { users } = storeToRefs(userStore);
const fetchUsers = () => {
  return userStore.fetchUsers();
};
onMounted(() => {
  //fetchUsers()
  userStore.fetchUserByFirstName("Stefania");
});
</script>

<template>
  <main>
    ...entrypoint
    <p :id="'id'+index" v-for="(user, index) in users" :key="index">{{ user.first_name }} {{ user.last_name}} - {{ user.company }}</p>
    <div class="layout">
      <SideBar />
      <UserDetail />
      <UserFormModal v-if="showModal" />
    </div>
  </main>
</template>

<style scoped></style> -->

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
    <SideBar @create-user="showModal = true" />
    <UserDetail />
    <UserFormModal v-if="showModal" @close="showModal = false" />
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
</style>
