<template >
    <div class="menu-wrapper">
        <section class="menu-button">
            <div class="menu-button-wrapper" @click="toggleMenu">
                <slot name="menuButton" />
            </div>
        </section>
        <section :style="customStyles.menuList" class="menu-list" v-if="activeMenu() === menuKey">
            <div class="menu-list-wrapper">
                <div v-for="item in menuList" :key="item.id" class="menu-list-item toggle-profile"
                    @click="handleItemClick(item.onClick)">
                    <div class="menu-list-item-svg">
                        <!-- <img :src="item.icon" /> -->
                        <component :is="item.icon"></component>
                    </div>
                    {{ item.label }}
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
export default {
    name: 'SimpleMenu',
    props: {
        menuKey: String,
        menuList: {
            type: Array,
            required: true
        },
        customStyles: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
        }
    },
    mounted() {
        window.addEventListener('click', this.handleGlobalClick);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.handleGlobalClick);
    },
    methods: {
        activeMenu() {
            return this.$store.state.menu.activeMenu;
        },
        toggleMenu() {
            this.$store.commit('menu/SET_MENU_OPEN', this.menuKey)
            console.log("this.activeMenu", this.activeMenu(), this.menuKey)
        },
        handleItemClick(cb) {
            this.$store.commit('menu/SET_MENU_CLOSE')
            cb();
        },
        handleGlobalClick(event) {
            const isOutSideMenu = !event.target.closest(`.${this.menuKey}`);
            const isMenuWrapper = !event.target.closest('.menu-wrapper');
            if (isOutSideMenu && isMenuWrapper && this.activeMenu() == this.menuKey) {
                this.$store.commit('menu/SET_MENU_CLOSE')
            }
        },
    }
};
</script>
  
<style>
.menu-list {
    position: absolute;
    background-color: #1f272f;
    width: 145px;
    border: 1px solid #31394e;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    font-size: 12px;
    color: #ffffff;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 5px 0;
    right: 5%;
}

.menu-list-item {
    background: none;
    cursor: pointer;
    border: none;
    color: #a6a6a8;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    padding: 5px 10px;
    transition: 0.2s ease;
}

.menu-list-item-svg {
    width: 20px;
    display: flex;
    align-items: center;
}

.menu-list-item:hover {
    color: #D7DF23;
}

.menu-list-item svg {
    width: 12px;
    height: 12px;
}

.menu-list-item:hover path {
    stroke: #D7DF23;
}

@media screen and (max-width: 500px) {}
</style>