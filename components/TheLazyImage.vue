<template>
  <div v-lazy class="opacity-0">
    <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3C/svg%3E"
        :class="imgClass"
        :data-src="src"
        :alt="alt"
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  imgClass: {
    type: String,
    required: false,
  },
});

const vLazy = {
  created: (el: HTMLElement) => {
    const loadImage = () => {
      const imageElement = el.children[0] as HTMLImageElement;
      imageElement.addEventListener('load', () => {
        setTimeout(() => {
          el.classList.remove('opacity-0');
        }, 100);
      });
      imageElement.addEventListener('error', () => {
        // ignore
      });
      imageElement.src = imageElement.dataset.src as string;
    };

    const createObserver = () => {
      const options = {
        threshold: 0,
      };
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            obs.unobserve(el);
          }
        });
      }, options);
      observer.observe(el);
    };

    if (window.IntersectionObserver) {
      createObserver();
    } else {
      loadImage();
    }
  },
};

</script>
