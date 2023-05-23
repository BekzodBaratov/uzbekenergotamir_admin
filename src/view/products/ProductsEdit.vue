<template>
  <div>
    <h2 class="text-[20px] font-semibold">Mahsulotlarni tahrirlash bo'limi</h2>
    <!-- <pre>{{ productList.product }}</pre> -->
    <form method="POST" v-if="isMount">
      <div class="flex w-full gap-10">
        <ProductInput v-model="productList.product.name" placeholder="Nomi" label="Nomi" />
        <ProductInput
          v-model="productList.product.product_detail.price"
          input-type="number"
          placeholder="Narxi"
          label="Narxi"
        />
      </div>

      <div class="flex w-full gap-10">
        <ProductInput v-model="productList.product.product_detail.colors" placeholder="Rangi" label="Rangi" />
        <ProductInput v-model="productList.product.product_detail.condition" placeholder="Holati" label="Holati" />
      </div>
      <div class="flex w-full gap-10 items-center">
        <!-- <pre>{{ configuration }}</pre> -->
        <Select
          v-if="category.length"
          class="w-full"
          label="Kategoriyani tanlang"
          :data="category"
          :model="productList?.product?.category.id"
          :modelLabel="productList?.product?.category.name"
          @getVal="selectVal($event)"
        />
        <Select
          v-if="configuration.length"
          class="w-full"
          label="Confugratsiyani tanlang"
          :modelLabel="configuration.find((el) => el.id === productList?.product?.configurationId).type"
          :isType="true"
          :model="productList?.product?.configurationId"
          :data="configuration"
          @getVal="selectConfigration($event)"
        />
      </div>

      <UploadImages :image="productList.product.image_url" @upload="getImages" />

      <div>
        <p class="mt-4">Products xusisiyatlarini tahrirlash:</p>
        <div class="w-full mb-4 mt-2">
          <form class="w-full" @submit="addService">
            <input
              type="text"
              v-model="service"
              class="w-full rounded-md h-[40px] px-4 outline-none"
              placeholder="Xarakteristika qo'shish"
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
      </div>

      <Textarea class="mt-4" v-model="productList.product.product_detail.description" placeholder="Qisqacha sharhini" />

      <button
        type="submit"
        @click="handleSubmit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Saqlash
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import AddModal from "../../components/modal/AddModal.vue";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
const route = useRoute();
const router = useRouter();

const toast = useToast();

const service = ref("");
const editServiceText = ref("");
const idEdit = ref("");

const productList = ref([]);

const form = reactive({
  imageFiles: "",
  category_id: null,
  configuration_id: null,
  features: ["RAM 8GB"],
});

// specification

const openModalService = ref(false);
function getModalService(emit) {
  openModalService.value = false;
  form.features[idEdit.value] = emit;
}

function deleteService(id) {
  form.features = form.features.filter((el, item) => item !== id);
}

function editService(id) {
  openModalService.value = true;
  idEdit.value = id;
  editServiceText.value = form.features[id];
}

function addService(e) {
  e.preventDefault();
  if (service.value !== "") {
    form.features.push(service.value);
    service.value = "";
  }
}

// =======

function selectVal(e) {
  form.category_id = e;
}

function selectConfigration(e) {
  form.configuration_id = e;
}

function getImages(e) {
  form.imageFiles = e.file;
}

const isMount = ref(false);
const fetchData = (data) => {
  const params = {
    withCredentials: true,
  };
  axios
    .get(`/products/${route.params.id}`)
    .then((res) => {
      productList.value = res.data.data;
      form.category_id = productList.value.product?.category.id;
      form.features = JSON.parse(productList.value.product?.product_detail?.specifications);
      isMount.value = true;
    })
    .catch((err) => {
      toast.error("Yuklanishda xatolik yuz berdi!");
    });
};

function handleSubmit(e) {
  e.preventDefault();
  const fetchObj = {
    name: productList.value?.product?.name,
    price: productList.value?.product?.product_detail?.price,
    description: productList.value?.product?.product_detail?.description,
    colors: productList.value?.product?.product_detail?.colors,
    category_id: form.category_id,
    configuration_id: form.configuration_id,
    specifications: JSON.stringify(form.features),
  };

  axios
    .patch(`/products/${route.params.id}`, fetchObj)
    .then((res) => {
      toast.success("Mahsulot muvaffaqiyatli tahrirlandi");
      setTimeout(() => {
        router.push("/products");
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
      .post(`products/update/image/${route.params.id}`, formData)
      .then((res) => {
        console.log(res, "images res");
      })
      .catch((err) => {
        toast.error("Rasm yangilashda xatoli berdi!");
      });
  }
}

const category = ref([]);
const configuration = ref([]);

function getCategoryList() {
  axios.get("/categories").then((res) => {
    category.value = res.data.data.categories;
  });
}

function fetchConfigurationList() {
  axios.get("/configurations").then((res) => {
    configuration.value = res.data.data.configurations;
  });
}

onMounted(() => {
  fetchData();
  getCategoryList();
  fetchConfigurationList();
});
</script>
