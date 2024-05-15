<template>
  <div class="header">
    <RouterLink class="link" :to="{ path: '/'}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M5.44958 7.93032L14.7931 7.9996C17.5545 7.9996 19.7931 10.2386 19.7931 13C19.7931 15.7614 17.5545 18 14.7931 18H7.7931C7.24081 18 6.7931 18.4477 6.7931 19C6.7931 19.5523 7.24081 20 7.7931 20H14.7931C18.6591 20 21.7931 16.866 21.7931 13C21.7931 9.13401 18.6591 6 14.7931 6L5.4197 5.93032L7.03611 3.93072C7.43119 3.54481 7.43862 2.91169 7.05271 2.51661C6.6668 2.12152 6.03368 2.11409 5.6386 2.5L2.30125 6.1806C1.9028 6.56979 1.89913 7.20953 2.2931 7.60326L5.6219 11.4311C6.01253 11.8215 6.6457 11.8214 7.03611 11.4307C7.42652 11.0401 7.42634 10.4069 7.0357 10.0165L5.44958 7.93032Z"/>
      </svg>
    </RouterLink>
    <h1>Product Details</h1>
  </div>
  <div v-if="isLoading" class="loading">
    <Loading/>
  </div>
    <div v-else class="product-widget">
      <div class="product-grid">
        <div class="product-card">
          <img :src="product?.thumbnailUrl" :alt="product?.name" class="image" />
          <div class="attributes">
            <h3>{{ getProductName(product?.name) }}</h3>
            <h4>{{ getDescription(product?.description) }}</h4>
            <h3>{{ product?.inStock ? 'In Stock' : 'Out of Stock' }}</h3>
            <p>{{ product?.defaultDisplayedPriceFormatted }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Loading from '../components/common/Loading.vue';
import {getProductName, getDescription} from '../utils/getCorrectData';
import {getProduct} from '../api-urls';
import { useRoute } from 'vue-router';
const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const route = useRoute();

let isLoading = ref(true);
const product = ref<Product | null>(null);

interface Product {
  id: number;
  name: string;
  defaultDisplayedPriceFormatted: string;
  thumbnailUrl: string;
  inStock: boolean;
  description: string
}

const fetchProducts = async (id: any) => {
  try {
    const response = await axios.get(`${baseApiUrl}${getProduct}/${id}`);
    if (response.data) {
      product.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    fetchProducts(id);
  }
});

</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.link, h1 {
  flex: 1;
}

.product-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border-radius: 8px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.product-card {
  display: flex;
  border: 1px solid #ccc;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 142px;
}

.attributes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image {
  border-radius: 10px;
  margin-right: 20px;
  max-width: 200px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.product-details h4 {
  margin: 0;
}
</style>