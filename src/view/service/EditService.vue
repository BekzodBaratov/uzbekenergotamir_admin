<template>
  <h2 class="text-[20px] font-semibold">Servicelar qo'shish bo'limi</h2>
  <form method="POST" v-if="isMount">
    <div class="flex w-full gap-10">
      <ProductInput
        v-model="productList.service.name"
        label="Nomi"
        placeholder="Valisher Botirov"
      />
      <ProductInput
        v-model="productList.service.phone"
        input-type="number"
        placeholder="+998995491111"
        :label="`Tel raqam : ${productList.service.phone}`"
      />
    </div>

    <UploadImages :image="productList.service.image_url" @upload="getImages" />

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
      <div
        class="my-2 w-full bg-white p-2 flex justify-between"
        v-for="(item, ind) in form.features"
        :key="ind"
      >
        <div>
          <span class="font-medium mr-2">{{ ind + 1 }}.</span>{{ item }}
        </div>
        <div
          class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full"
        >
          <i
            class="fa-solid fa-pen-to-square text-[blue] cursor-pointer"
            @click="editService(ind)"
          ></i>
          <AddModal
            label="Service turini tahrirlash"
            :isOpen="openModalService"
            :value="editServiceText"
            @closeModal="openModalService = $event"
            @fetchModal="getModalService"
          />
          <i
            class="fa-solid fa-trash text-[red] cursor-pointer"
            @click="deleteService(ind)"
          ></i>
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
          <div
            class="flex items-center justify-end gap-3 flex-shrink-0 max-w-[200px] w-full"
          >
            <i
              class="fa-solid fa-pen-to-square text-[blue] cursor-pointer"
              @click="editProblem(ind)"
            ></i>
            <AddModal
              label="Muommo turini tahrirlash"
              :isOpen="openModalProblem"
              :value="editProblemText"
              @closeModal="openModalProblem = $event"
              @fetchModal="getModalProblem"
            />
            <i
              class="fa-solid fa-trash text-[red] cursor-pointer"
              @click="deleteProblem(ind)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <Textarea
      v-model="productList.service.description"
      placeholder="Qisqacha sharhi"
    />

    <SButton variant="primary_dark" type="submit" @click="handleSubmit">
      Saqlash
    </SButton>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import SButton from "../../components/buttons/SButton.vue";
import AddModal from "../../components/modal/AddModal.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();

const service = ref("");
const editServiceText = ref("");
const editProblemText = ref("");

const problem = ref("");

const form = reactive({
  name: "",
  description: "",

  phone: "",
  imageFiles: "",

  features: ["A'lo darajada xizmat ko'rsatamiz!"],
  resolve_problems: [
    "Kompyuter bilan bog'liq muommolaringizni hal qilib beramiz!",
  ],
});

// modal servise
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

const idEdit = ref("");
function editService(id) {
  idEdit.value = id;
  openModalService.value = true;
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
  form.resolve_problems = form.resolve_problems.filter(
    (el, item) => item !== id
  );
}

function editProblem(id) {
  openModalProblem.value = true;
  idEdit.value = id;

  let name = form.resolve_problems[id];
  editProblemText.value = name;
}

function getImages(e) {
  form.imageFiles = e.file;
}

// Edit section

const productList = ref([]);

const isMount = ref(false);
const fetchData = () => {
  const params = {
    withCredentials: true,
  };
  axios
    .get(`/services/${route.params.id}`)
    .then((res) => {
      productList.value = res.data.data;
      form.features = productList.value.service.features;
      form.resolve_problems = productList.value.service.resolve_problems;
      isMount.value = true;
    })
    .catch((err) => {
      toast.error("Yuklanishda xatolik yuz berdi!");
    });
};

function handleSubmit(e) {
  e.preventDefault();
  const fetchObj = {
    name: productList.value.service.name,
    phone: productList.value.service.phone,
    description: productList.value.service.description,
    features: form.features,
    resolve_problems: form.resolve_problems,
  };

  axios
    .patch(`/services/${route.params.id}`, fetchObj)
    .then((res) => {
      toast.success("Service muvaffaqiyatli tahrirlandi");
      setTimeout(() => {
        router.push("/services");
      }, 3000);
      console.log(res);
    })
    .catch((err) => {
      toast.error("Tahrirlashda xatoli yuz berdi!");
    });

  if (form.imageFiles) {
    let formData = new FormData();
    formData.append("image", form.imageFiles);
    axios
      .post(`services/update/image/${route.params.id}`, formData)
      .then((res) => {
        console.log(res, "images res");
      });
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
