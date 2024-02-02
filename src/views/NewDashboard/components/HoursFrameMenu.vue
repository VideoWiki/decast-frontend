<template >
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <slot name="menuButton" />
        <vs-dropdown-menu class="vx-navbar-dropdown">
            <div class="menu-list-wrapper">
                <div v-for="item in menuList" :key="item.id" class="menu-list-item" @click="()=> stepTwoProps.duration = item.value">
                    <vs-dropdown-item>
                        <p>{{ item.label }}</p>
                    </vs-dropdown-item>
                </div>
            </div>
        </vs-dropdown-menu>
    </vs-dropdown>
</template>
  
<script>
export default {
    name: 'HoursFrameMenu',
    props: ['menuList', 'stepTwoProps'],
};
</script>
  
<style>
.menu-list-wrapper * {
    font-family: 'JetBrains Mono' !important;
}
.vs-dropdown--menu,
.vs-dropdown--menu--after {
    --vs-primary: #D7DF23;
    background: #000000 !important;
    border-color: #FFFFFF !important;

    .con-dropdown--group-ul {
        background: #000000 !important;
    }

    .vs-dropdown--item {
        .vs-dropdown--item-link.disabled {
            color: #a0a0a0 !important;
        }
    }
}

.vs-dropdown--menu {
    min-width: 110px;
    max-height: 250px;
    border-radius: 0px !important;
    overflow-y: scroll;
}

.vs-dropdown--item {
    margin: 0px !important;
}

.menu-list {
    position: absolute;
    background-color: #000000;
    width: 145px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    font-size: 12px;
    color: #ffffff !important;
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
    color: #FFFFFF !important;
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