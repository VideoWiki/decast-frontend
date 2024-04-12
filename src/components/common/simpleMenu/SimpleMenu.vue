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
                <div v-for="item in menuList" :key="item.id" class="menu-list-item" @click="item.onClick">
                    <vx-tooltip v-if="item.tooltip" :text="item.tooltip" :position="item.tooltipPosition || 'bottom'"
                        delay=".3s">
                        <vs-dropdown-item>
                            <div v-if="item.icon" class="menu-list-item-svg">
                                <component :is="item.icon"></component>
                            </div>
                            <p>{{ item.label }}</p>
                        </vs-dropdown-item>
                    </vx-tooltip>
                    <vs-dropdown-item v-else>
                        <div v-if="item.icon" class="menu-list-item-svg">
                            <component :is="item.icon"></component>
                        </div>
                        <p>{{ item.label }}</p>
                    </vs-dropdown-item>
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
};
</script>
  
<style>
.vs-dropdown--menu,
.vs-dropdown--menu--after {
    --vs-primary: #D7DF23;
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

.vs-dropdown--item {
    margin: 0px !important;
}

.vs-tooltip {
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    color: #000000;
    border-radius: 0px;
    font-weight: 500;
    padding: 2px 7px !important;
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
    transition: 0.2s ease !important;
}

.menu-list-item a {
    background: none;
    cursor: pointer;
    border: none;
    color: #a6a6a8;
    text-align: left;
    display: flex !important;
    justify-content: flex-start;
    align-content: center;
    padding: 5px 10px;
    text-decoration: none !important;

    p {
        white-space: nowrap;
        font-size: 12px;
        transition: 0.2s ease;
    }
}

.menu-list-item-svg {
    min-width: 20px;
    display: flex;
    align-items: center;
    transition: 0.2s ease;
}

.menu-list-item:hover a {
    p {
        color: #D7DF23 !important;
    }
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