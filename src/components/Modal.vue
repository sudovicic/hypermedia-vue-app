<script setup lang="ts"></script>

<template>
  <div
    class="modal fixed left-0 right-0 bottom-0 top 0 w-screen h-screen bg-gray-700 bg-opacity-100 z-10"
  ></div>

  <div
    id="defaultModal"
    class="w-11/12 absolute -translate-x-2/4 top-1/4 left-2/4 right-0 z-50 overflow-x-hidden overflow-y-auto h-modal md:h-full"
    tabindex="-1"
  >
    <div class="relative h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            <slot name="header"></slot>
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            @click="$emit('close')"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
