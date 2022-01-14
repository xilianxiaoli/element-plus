import * as VueRouter from 'vue-router';

const routes: VueRouter.RouteRecordRaw[] = [
    { path: '/com', name: 'com', component: () => import('./page/base.vue') },
];

const router: VueRouter.Router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

export default router;