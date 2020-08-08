import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Components from "@/pages/Components";
import ComponentDemos from "@/pages/components/index";

Vue.use(Router);

export default new Router({
  saveScrollPosition: true,
  history: true,
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/components",
      name: "components",
      component: Components,
      children: [
        {
          path: "/components/select",
          name: "component_select",
          component: ComponentDemos.SelectDemo,
          meta: {
            displayName: "Select",
          },
        },
        {
          path: "/components/tree",
          name: "component_tree",
          component: ComponentDemos.TreeDemo,
          meta: {
            displayName: "Tree",
          },
        },
        {
          path: "/components/tree-select",
          name: "component_tree_select",
          component: ComponentDemos.TreeSelectDemo,
          meta: {
            displayName: "TreeSelect",
          },
        },
        {
          path: "/components/table",
          name: "component_table",
          component: ComponentDemos.TableDemo,
          meta: {
            displayName: "Table",
          },
        },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
