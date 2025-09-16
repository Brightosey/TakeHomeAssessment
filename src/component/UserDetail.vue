<script setup>
import { storeToRefs } from "pinia";
import useUserStore from "../store/users";

const userStore = useUserStore();
const { selectedUser } = storeToRefs(userStore);

const saveUser = () => {
  if (!selectedUser.value) return;
  console.log("Saving user:", selectedUser.value);
};
</script>

<template>
  <div v-if="selectedUser" class="detail-wrapper">
    <div class="profile-section">
      <img
        class="avatar"
        :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.first_name}`"
        alt="avatar"
      />
    </div>

    <div class="form-section">
      <h2 class="users-name">
        {{ selectedUser.first_name }} {{ selectedUser.last_name }}
      </h2>
      <p class="job-title">{{ "Product Manager" }}</p>
      <h3 class="user-details">User Details</h3>

      <form @submit.prevent="saveUser">
        <div class="field">
          <label>First Name *</label>
          <input v-model="selectedUser.first_name" required />
        </div>

        <div class="field">
          <label>Last Name *</label>
          <input v-model="selectedUser.last_name" required />
        </div>

        <div class="field">
          <label>Plan *</label>
          <select v-model="selectedUser.plan" required>
            <option>Free Plan</option>
            <option>Basic Plan</option>
            <option>Pro Plan</option>
            <option>Enterprise Plan</option>
          </select>
        </div>

        <div class="field">
          <label>Company *</label>
          <select v-model="selectedUser.company" required>
            <option>Apple</option>
            <option>Microsoft</option>
            <option>Google</option>
            <option>Axiom</option>
          </select>
        </div>

        <div class="field">
          <label>Email *</label>
          <input v-model="selectedUser.email" type="email" required />
        </div>

        <div class="field">
          <label>Phone *</label>
          <input v-model="selectedUser.phone" required />
        </div>

        <div class="actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>

  <div v-else class="empty">
    <p>Select a user from the sidebar</p>
  </div>
</template>

<style scoped>
.detail-wrapper {
  display: flex;
  flex: 1;
  margin: 1rem;
  background: #f4f8ff;
  border-radius: 8px;
}

.profile-section {
  width: 260px;
  background: rgb(217, 235, 255);
  padding: 1rem;
  text-align: center;
  border-radius: 6px;
}
.avatar {
  width: 90%;
  border: 1px solid #333;
  padding: 1rem;
  margin-bottom: 1rem;
}
.job-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 1rem;
}

.form-section {
  flex: 1;
  padding: 1.5rem 2rem;
  background: rgb(240, 248, 255);
}
.users-name {
  color: black;
}
.user-details {
  color: black;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  background: rgb(231, 238, 245);
  padding: 0.8rem;
  border: 1px dashed rgb(231, 238, 245);
  border-radius: 6px;
}
.field label {
  font-size: 13px;
  margin-bottom: 0.3rem;
  color: #333;
}
.field input,
.field select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  text-align: right;
}
.actions button {
  background: #1976d2;
  width: 50%;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}
.actions button:hover {
  background: #1259a5;
}

.empty {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
}
</style>
