<template>
  <div>
    <div v-if="multiplebol" class="flex gap-3 flex-wrap">
      <div
        v-if="imageUrls.length < 5"
        class="max-w-[300px] min-h-[170px] h-[170px] w-full flex items-center justify-center rounded-[10px] relative border border-dashed !border-black image-upload"
      >
        <input
          id="file"
          type="file"
          name="file"
          class="w-0 h-0 absolute inset-0"
          accept="image/png, image/jpeg"
          @change="handleFile"
          :multiple="multiplebol"
        />
        <div
          class="w-full h-full absolute top-0 flex items-center justify-center flex-col gap-5 cursor-pointer"
          @click="getFile"
        >
          <p class="text-[#8390A6] text-base font-normal opacity-80">
            {{ desc }}
          </p>
        </div>
      </div>
      <div
        v-for="(url, i) in imageUrls"
        :key="i"
        class="max-w-[300px] min-h-[170px] h-[170px] w-full flex items-center justify-center rounded-[10px] relative border border-dashed !border-black image-upload"
      >
        <div class="w-full h-full flex-center relative object-cover">
          <img
            :src="url.urlData"
            alt="avatar"
            class="w-full h-full object-cover relative z-0 rounded-[10px]"
            @error="imageUrls = []"
          />
          <div
            class="absolute top-0 left-0 bg-[#27314099] w-full h-full flex items-center justify-center z-20 rounded-[10px] cursor-pointer"
            @click="removeImage()"
          >
            <span class="text-white text-2xl">Remove Image</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!multiplebol">
      <div
        class="max-w-[300px] min-h-[170px] h-[170px] w-full flex items-center justify-center rounded-[10px] relative border border-dashed !border-black image-upload"
      >
        <input
          id="file"
          type="file"
          name="file"
          class="w-0 h-0 absolute inset-0"
          accept="image/png, image/jpeg"
          @change="handleFile"
          :multiple="multiplebol"
        />
        <div v-if="imageUrls.length" class="w-full h-full flex-center relative object-cover">
          <img
            :src="imageUrls[0].urlData"
            alt="avatar"
            class="w-full h-full object-cover relative z-0 rounded-[10px]"
            @error="imageUrls = []"
          />
          <div
            class="absolute top-0 left-0 bg-[#27314099] w-full h-full flex items-center justify-center z-20 rounded-[10px] cursor-pointer"
            @click="removeImage()"
          >
            <span class="text-white text-2xl">Remove Image</span>
          </div>
        </div>
        <div
          v-else
          class="w-full h-full absolute top-0 flex items-center justify-center flex-col gap-5 cursor-pointer"
          @click="getFile"
        >
          <p class="text-[#8390A6] text-base font-normal opacity-80">
            {{ desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, withDefaults } from "vue";

const emit = defineEmits(["upload"]);
interface Props {
  error: boolean;
  desc: string;
  image: string;
  multiplebol: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  error: false,
  multiplebol: false,
  desc: "Upload images",
});

const image = reactive({ files: null, file: null });

let imageUrls = ref([]);
const handleFile = (event: any) => {
  if (event.target.files.length > 4) return alert("Please select a file to upload less than 4 files");
  if (props.multiplebol) {
    image.files = event.target.files;
    if (event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e) => {
          imageUrls.value.push({ urlData: e.target.result, name: event.target.files[i].name });
        };
      }
      send();
    }
  } else {
    image.file = event.target.files[0];
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        imageUrls.value.push({ urlData: e.target.result, name: event.target.files[0].name });
      };
      send();
    }
  }
};
const getFile = () => document.getElementById("file")?.click();
const removeImage = () => {
  imageUrls.value = [];
  image.files = null;
  send();
};
const send = () => emit("upload", image);
</script>

<style>
.color {
  color: #e74c3c;
}
</style>
Copy
