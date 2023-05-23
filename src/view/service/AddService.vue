<template>
  <h2 class="text-[20px] font-semibold">Servicelar qo'shish bo'limi</h2>

  <form method="POST">
    <div class="flex w-full gap-10">
      <ProductInput v-model="form.name" label="Nomi" placeholder="Valisher Botirov" />
      <ProductInput v-model="form.phone" input-type="number" placeholder="+998995491111" label="Tel raqam" />
    </div>

    <UploadImages @upload="getImages" />

    <!-- to do -->
    <p class="mt-4">Muommo qo'shish:</p>
    <div class="w-full my-4">
      <form class="w-full" @submit="addService">
        <input
          type="text"
          v-model="service"
          class="w-full rounded-md h-[40px] px-4 outline-none"
          placeholder="Service qo'shish"
        />
      </form>
      <div class="my-2 w-full bg-white p-2 flex justify-between" v-for="(item, ind) in form.features" :key="ind">
        <div>
          <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
        </div>
        <div class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full">
          <i class="fa-solid fa-pen-to-square text-[blue] cursor-pointer" @click="editService(ind)"></i>
          <AddModal
            label="Service turini tahrirlash"
            :isOpen="openModalService"
            :value="editServiceText"
            @closeModal="openModalService = $event"
            @fetchModal="getModalService"
          />
          <i class="fa-solid fa-trash text-[red] cursor-pointer" @click="deleteService(ind)"></i>
        </div>
      </div>
    </div>

    <!-- resolve problem -->

    <div class="mb-4 mt-2">
      <p>Muommoga yechim qo'shish:</p>
      <div class="w-full my-3">
        <form class="w-full" @submit="addProblem">
          <input
            type="text"
            v-model="problem"
            class="w-full rounded-md h-[40px] px-4 outline-none"
            placeholder="Muommolar qo'shish"
          />
        </form>
        <div
          class="my-2 w-full bg-white p-2 flex justify-between"
          v-for="(item, ind) in form.resolve_problems"
          :key="ind"
        >
          <div>
            <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
          </div>
          <div class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full">
            <i class="fa-solid fa-pen-to-square text-[blue] cursor-pointer" @click="editProblem(ind)"></i>
            <AddModal
              label="Muommo turini tahrirlash"
              :isOpen="openModalProblem"
              :value="editProblemText"
              @closeModal="openModalProblem = $event"
              @fetchModal="getModalProblem"
            />
            <i class="fa-solid fa-trash text-[red] cursor-pointer" @click="deleteProblem(ind)"></i>
          </div>
        </div>
      </div>
    </div>

    <Textarea v-model="form.description" placeholder="Qisqacha sharhi" />

    <button
      type="submit"
      @click="handleSubmit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Saqlash
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import AddModal from "../../components/modal/AddModal.vue";

const toast = useToast();

const service = ref("");
const editServiceText = ref("");
const editProblemText = ref("");

const problem = ref("");

const idEdit = ref("");

const form = reactive({
  name: "",
  description: "",

  phone: "",
  imageFiles: "",

  features: ["A'lo darajada xizmat ko'rsatamiz!"],
  resolve_problems: ["Kompyuter bilan bog'liq muommolaringizni hal qilib beramiz!"],
});

// modal service

const openModalService = ref(false);

function getModalService(emit) {
  openModalService.value = false;
  form.features[idEdit.value] = emit;
}

// modal probleam
const openModalProblem = ref(false);
function getModalProblem(emit) {
  openModalProblem.value = false;
  form.resolve_problems[idEdit.value] = emit;
}

// add service

function addService(e) {
  e.preventDefault();
  if (service.value !== "") {
    form.features.push(service.value);
    service.value = "";
  }
}

function deleteService(id) {
  form.features = form.features.filter((el, item) => item !== id);
}

function editService(id) {
  openModalService.value = true;
  idEdit.value = id;
  editServiceText.value = form.features[id];
}

// resolve propblem

function addProblem(e) {
  e.preventDefault();
  if (problem.value !== "") {
    form.resolve_problems.push(problem.value);
    problem.value = "";
  }
}

function deleteProblem(id) {
  form.resolve_problems = form.resolve_problems.filter((el, item) => item !== id);
}

function editProblem(id) {
  openModalProblem.value = true;
  idEdit.value = id;
  editProblemText.value = form.resolve_problems[id];
}

// submit form

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.imageFiles) {
    let phoneNumber = "+" + String(form.phone);
    let formData = new FormData();
    formData.append("image", form.imageFiles);
    formData.append("name", form.name);
    formData.append("phone", phoneNumber);
    formData.append("description", form.description);
    formData.append("resolve_problems", JSON.stringify(form.resolve_problems));
    formData.append("features", JSON.stringify(form.features));
    fetchData(formData);
  }
};

function getImages(e) {
  form.imageFiles = e.file;
}

const fetchData = (data) => {
  axios({
    method: "POST",
    url: "services",
    withCredentials: true,
    data: data,
  })
    .then((res) => {
      toast.success("Muvaffaqiyatli qo'shildi");
      form.name = "";
      form.phone = "";
      form.description = "";
      form.imageFiles = "";
      form.specifications = {};
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((err) => {
      toast.error("Xatolik yuz berdi");
    });
};
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
