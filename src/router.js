import Vue from 'vue'
import VueRouter from "vue-router"

import MainMenu from "@/components/MainMenu";
import Registration from "@/components/Registration";
import Login from "@/components/Login";
import EditProfile from "@/components/EditProfile";
import CreateEvent from "@/components/CreateEvent";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: MainMenu },
    { path: '/registration', component: Registration },
    { path: '/login', component: Login },
    { path: '/edit-profile', component: EditProfile },
    { path: '/create-event', component: CreateEvent },
  ]
})
