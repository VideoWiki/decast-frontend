<template >
    <!-- <div class="menu-wrapper">
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
                        <component :is="item.icon"></component>
                    </div>
                    {{ item.label }}
                </div>
            </div>
        </section>
    </div> -->
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <slot name="menuButton" />

        <vs-dropdown-menu class="vx-navbar-dropdown">
            <div class="menu-list-wrapper">
                <div v-for="item in menuList" :key="item.id" class="menu-list-item"
                    @click="item.onClick">
                    <div class="menu-list-item-svg">
                        <component :is="item.icon"></component>
                    </div>
                    <p>{{ item.label }}</p>
                </div>
            </div>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>
  
<script>
export default {
    name: 'SimpleMenu',
    props: {
        menuList: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
        }
    },
    methods: {
    }
};
</script>
  
<style>
.vs-dropdown--menu,
  .vs-dropdown--menu--after {
    background: #1f272f !important;
    border-color: #31394e !important;

    .con-dropdown--group-ul {
      background: #1f272f !important;
    }

    .vs-dropdown--item {
      .vs-dropdown--item-link.disabled {
        color: #1f272f !important;
      }
    }
  }

.vs-tooltip {
    background: #181A20;
    border: 1px solid #31394e;
    color: rgba(255, 255, 255, 0.40);
}
.vs-tooltip:after {
    border-top: 1px solid #31394e;
    border-left: 1px solid #31394e;
}
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

    p {
        white-space: nowrap;
        font-size: 12px;
    }
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