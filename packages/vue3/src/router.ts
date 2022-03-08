import * as VueRouter from 'vue-router';

export const routes: VueRouter.RouteRecordRaw[] = [
    { path: '/com', name: 'com', component: () => import('./page/base.vue'), meta: { title: '基础组件' } },
    { path: '/form', name: 'form', component: () => import('./components/demo-form.vue'), meta: { title: '基础表单' } },
    { path: '/FormCollapse', name: 'FormCollapse', component: () => import('./components/FormCollapse.vue'), meta: { title: 'FormCollapse' } },
    { path: '/FormDialog', name: 'FormDialog', component: () => import('./components/FormDialog.vue'), meta: { title: 'FormDialog' } },
    { path: '/FormDrawer', name: 'FormDrawer', component: () => import('./components/FormDrawer.vue'), meta: { title: 'FormDrawer' } },
    { path: '/FormGrid', name: 'FormGrid', component: () => import('./components/FormGrid.vue'), meta: { title: 'FormGrid' } },
    { path: '/ArrayCards', name: 'ArrayCards', component: () => import('./components/ArrayCards.vue'), meta: { title: 'ArrayCards' } },
    { path: '/ArrayCollapse', name: 'ArrayCollapse', component: () => import('./components/ArrayCollapse.vue'), meta: { title: 'ArrayCollapse' } },
    { path: '/ArrayTable', name: 'ArrayTable', component: () => import('./components/ArrayTable.vue'), meta: { title: 'ArrayTable' } },
    { path: '/ArrayTableEffect', name: 'ArrayTableEffect', component: () => import('./components/ArrayTableEffect.vue'), meta: { title: 'ArrayTableEffect' } },
    { path: '/ArrayTabs', name: 'ArrayTabs', component: () => import('./components/ArrayTabs.vue'), meta: { title: 'ArrayTabs' } },
    { path: '/FormStep', name: 'FormStep', component: () => import('./components/FormStep.vue'), meta: { title: 'FormStep' } },
    { path: '/FormTab', name: 'FormTab', component: () => import('./components/FormTab.vue'), meta: { title: 'FormTab' } },
];

const router: VueRouter.Router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

export default router;