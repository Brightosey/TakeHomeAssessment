<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import useUserStore from "../store/users";

const emit = defineEmits(["close"]);

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const newUser = ref({
  first_name: "",
  last_name: "",
  email: "",
  plan: "",
  company: "",
  phone_number: "",
});

const isLoading = ref(false);

const companies = computed(() => {
  return [...new Set(users.value.map((user) => user.company))];
});

/* const saveNewUser = async () => {
  isLoading.value = true;
  await userStore.createUser(newUser.value);
  isLoading.value = false;
  emit("close");
}; */

const saveNewUser = async () => {
  isLoading.value = true;
  try {
    await userStore.createUser(newUser.value);
    emit("close");
  } catch (error) {
    console.log("Error saving data", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h2 class="modal-header">Create New User</h2>
      <br />
      <p class="close" @click="emit('close')">x</p>
      <form @submit.prevent="saveNewUser">
        <input v-model="newUser.first_name" placeholder="First Name" required />
        <input v-model="newUser.last_name" placeholder="Last Name" required />
        <input
          v-model="newUser.email"
          type="email"
          placeholder="Email"
          required
        />

        <select v-model="newUser.plan" required>
          <option value="">Select Plan</option>
          <option>Free Plan</option>
          <option>Basic Plan</option>
          <option>Pro Plan</option>
          <option>Enterprise Plan</option>
        </select>

        <select v-model="newUser.company" required>
          <option value="">Select Company</option>
          <option v-for="company in companies" :key="company" :value="company">
            {{ company }}
          </option>
        </select>

        <input
          v-model="newUser.phone_number"
          type="number"
          placeholder="Phone #"
          required
        />

        <div class="actions">
          <button type="submit" @submit="saveNewUser">
            {{ isLoading ? "Saving..." : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.436);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  padding: 1.5rem;
  border-radius: 6px;
  width: 500px;
  height: fit-content;
  position: relative;
}

.modal-header {
  color: black;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.close {
  position: absolute;
  font-family: Helvetica;
  top: 10px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

input,
select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 14px;
  width: 100%;
  appearance: none;
}

.actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}
.actions button:first-child {
  background: #ccc;
}
.actions button:last-child {
  background: #1976d2;
  color: #fff;
}
</style>
