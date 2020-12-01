import Vue from 'vue'
import VueRouter from "vue-router"

import HelloWorld from "@/components/HelloWorld";
import Registration from "@/components/Registration";
import Login from "@/components/Login";
import EditProfile from "@/components/EditProfile";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/registration', component: Registration },
    { path: '/login', component: Login },
    { path: '/edit-profile', component: EditProfile },
  ]
})
