<script setup>
import { ref } from "vue";
import useUserStore from "../store/users";

const emit = defineEmits(["close"]);

const userStore = useUserStore();

const newUser = ref({
  first_name: "",
  last_name: "",
  email: "",
  plan: "",
  company: "",
  phone: "",
});

const saveNewUser = async () => {
  await userStore.createUser(newUser.value);
  emit("close");
};
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h3>Create New User</h3>
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
          <option>Apple</option>
          <option>Microsoft</option>
          <option>Google</option>
          <option>Axiom</option>
        </select>

        <input v-model="newUser.phone" placeholder="Phone #" required />

        <div class="actions">
          <button type="submit" @click="emit('close')">Save</button>
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
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  padding: 1.5rem;
  border-radius: 6px;
  width: 90%;
  height: 70vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.actions button:first-child {
  background: #ccc;
}
.actions button:last-child {
  background: #1976d2;
  color: #fff;
}
</style>
