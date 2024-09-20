<template>
    <div class="faq-div p-6 mb-6">
        <h3 class="text-white cursor-pointer" @click="toggleOpen">
            <svg :class="{ 'rotate': isOpen }" width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.3346 8.49992H1.66797M20.3346 8.49992C20.3346 10.422 14.5013 15.7916 14.5013 15.7916M20.3346 8.49992C20.3346 6.57784 14.5013 1.20825 14.5013 1.20825"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ quesObj.ques }}
        </h3>
        <p :class="{ 'flex mt-4 text-white': isOpen, 'hidden': !isOpen }">/* {{ quesObj.answer }} */</p>
    </div>
</template>

<script>
export default {
    name: 'FaqBox',
    props: ['quesObj'],
    components: {
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggleOpen() {
            this.isOpen = !this.isOpen;
        },
    },
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}
.faq-div {
    border: 1px solid #FFFFFF;
}
svg {
  transition: transform 0.3s ease; /* Smooth transition for rotation */
}
.rotate {
  transform: rotate(90deg);
}
</style>