<template>
    <div class="header">
        <RouterLink class="link" :to="{ path: '/'}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M5.44958 7.93032L14.7931 7.9996C17.5545 7.9996 19.7931 10.2386 19.7931 13C19.7931 15.7614 17.5545 18 14.7931 18H7.7931C7.24081 18 6.7931 18.4477 6.7931 19C6.7931 19.5523 7.24081 20 7.7931 20H14.7931C18.6591 20 21.7931 16.866 21.7931 13C21.7931 9.13401 18.6591 6 14.7931 6L5.4197 5.93032L7.03611 3.93072C7.43119 3.54481 7.43862 2.91169 7.05271 2.51661C6.6668 2.12152 6.03368 2.11409 5.6386 2.5L2.30125 6.1806C1.9028 6.56979 1.89913 7.20953 2.2931 7.60326L5.6219 11.4311C6.01253 11.8215 6.6457 11.8214 7.03611 11.4307C7.42652 11.0401 7.42634 10.4069 7.0357 10.0165L5.44958 7.93032Z"/>
            </svg>
        </RouterLink>
        <h1 class="title">Settings</h1>
    </div>
    <div class="a-card a-card--vertical-compact">
        <div class="a-card__paddings">
            <div class="iconable-block iconable-block--hide-in-mobile">
                <div class="iconable-block__infographics">
                    <span class="iconable-block__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.27 2.91c-.08-.5-.59-.91-1.12-.91h-7.3c-.52 0-1.04.41-1.12.91l-.72 4.18c-.08.5.29.91.83.91H2v3.08c0 .51.44.92.98.92h7.04c.55 0 .98-.41.98-.92V8h.16c.55 0 .91-.41.83-.91l-.72-4.18z"/><path d="M15 8v3.08c0 .51.44.92.98.92h7.04c.55 0 .98-.41.98-.92V8s1.07-.41.99-.91l-.71-4.18c-.09-.5-.6-.91-1.13-.91h-7.29c-.53 0-1.04.41-1.13.91l-.71 4.18c-.09.5.98.91.98.91zm7 2h-5V8h5v2zm-5.43-6h5.86l.34 2h-6.54l.34-2zm-6.42 10h-7.3c-.53 0-1.04.41-1.13.91l-.71 4.18c-.08.5.99.91.99.91v3.08c0 .51.44.92.98.92h7.04c.55 0 .98-.41.98-.92V20s1.07-.41.99-.91l-.71-4.18c-.09-.5-.6-.91-1.13-.91zm-6.58 2h5.86l.34 2H3.23l.34-2zM9 22H4v-2h5v2zm14.15-8h-7.29c-.53 0-1.04.41-1.13.91l-.71 4.18c-.09.5.98.91.98.91v3.08c0 .51.44.92.98.92h7.04c.55 0 .98-.41.98-.92V20s1.07-.41.99-.91l-.71-4.18c-.09-.5-.6-.91-1.13-.91zm-6.58 2h5.86l.34 2h-6.54l.34-2zM22 22h-5v-2h5v2z"/></svg>
                    </span>
                </div>
                <div class="iconable-block__content">
                    <div class="status-block">
                        <div class="status-block__central">
                            <div class="status-block__header">
                                <span class="status-block__title">Widget Settings</span>
                                <span class="status-block__edit">Edit</span>
                            </div>
                            <div class="status-block__content">
                                <p>Turn on switch to choose products and export them to a csv file.</p>
                                
                            </div>
                        </div>
                        <div class="status-block__primary-action">
                            <label class="checkbox big">
                                <input name="" type="checkbox" checked="" v-model="widgetEnabled">
                                <div>
                                    <div></div>
                                </div>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="widgetEnabled">
        <ProductWidget @onSelect="handleSelect" :showCheckboxes="true" />
        <button class="btn-medium" @click="exportProducts">Export Selected to CSV</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import ProductWidget from '../views/ProductWidget.vue';
import axios from 'axios';
import {exportCsv} from '../api-urls';

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const widgetEnabled = ref(false);
const importedProducts = ref([]);

const handleSelect = (data) => {
    importedProducts.value = data;
};

const exportProducts = async () => {
    if (importedProducts.value == 0){
        return;
    }
    try {
        const response = await axios.post(`${baseApiUrl}${exportCsv}`, {
            products: importedProducts.value
        }, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Failed to export products:', error);
    }
}
</script>
  
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.link, .title {
    flex: 1;
}

.status-block__content {
    display: flex;
    align-items: center;
}

.btn-medium {
    display: block;
    margin: 20px auto;
    background-color: #42b883;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
} 
</style>
  