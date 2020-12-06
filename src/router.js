import Vue from 'vue'
import VueRouter from "vue-router"

import MainMenu from "@/components/MainMenu";
import Registration from "@/components/Registration";
import Login from "@/components/Login";
import UserProfile from "@/components/UserProfile";
import CreateEvent from "@/components/CreateEvent";
import UserEvents from "@/components/UserEvents";
import JoinEvent from "@/components/JoinEvent";
import Event from "@/components/Event";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: MainMenu },
    { path: '/registration', component: Registration },
    { path: '/login', component: Login },
    { path: '/user-profile', component: UserProfile },
    { path: '/create-event', component: CreateEvent },
    { path: '/user-events', component: UserEvents },
    { path: '/join-event', component: JoinEvent },
    { path: '/event/:eventId', component: Event },
  ]
})
