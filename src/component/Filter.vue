<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useUserStore from "../store/users";

const emit = defineEmits(["apply-filters", "reset-filters"]);

const userStore = useUserStore();

const firstName = ref("");
const lastName = ref("");
const showFilters = ref(false);
const filter = ref("");

const resetFilters = () => {
  firstName.value = "";
  lastName.value = "";
  filter.value = "";
  showFilters.value = false;
  emit("reset-filters");
};

const applyFilters = () => {
  emit("apply-filters", {
    firstName: firstName.value,
    lastName: lastName.value,
    filter: filter.value,
  });
  showFilters.value = false;
};
</script>

<template>
  <div class="header">
    <button class="show-filters" @click="showFilters = !showFilters">
      <span>Filter Users</span>
    </button>

    <div class="filters" v-if="showFilters">
      <div>
        <label>First Name</label>
        <input class="search" v-model="firstName" />
      </div>
      <div>
        <label>Last Name</label>
        <input class="search" v-model="lastName" />
      </div>
      <div>
        <label>Plan</label>
        <select class="filter-select" v-model="filter">
          <option value="">All Plans</option>
          <option>Free Plan</option>
          <option>Basic Plan</option>
          <option>Pro Plan</option>
          <option>Enterprise Plan</option>
        </select>
      </div>

      <div class="actions">
        <button class="reset-filters" @click="resetFilters">Reset</button>
        <button class="apply-filters" @click="applyFilters">Filter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 1rem;
}

.reset-filters {
  background: transparent;
  color: #333;
  border: none;
  padding: 0.6rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.apply-filters {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0 1rem;
  border-radius: 4px;
}

.filters {
  margin: 0 1rem;
  display: flex;
  gap: 0.2rem;
  flex-direction: column;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #ffffff;
  position: absolute;
  width: calc(100% - 3rem);
}

.search,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.header {
  position: relative;
}

.show-filters {
  margin: 1rem 1rem 0 1rem;
  background: #1976d2;
  color: #fff;
  width: calc(100% - 3rem);
  border: none;
  padding: 0.6rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

label {
  font-size: 12px;
  margin-bottom: 0;
  color: #333;
}
</style>
