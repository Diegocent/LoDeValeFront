import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: "/dashboard", title: "Dashboard", icon: "pe-7s-graph", class: "" },
  { path: "/table", title: "Ventas", icon: "pe-7s-note2", class: "" },
  {
    path: "/typography",
    title: "Reporte Ventas",
    icon: "pe-7s-news-paper",
    class: "",
  },
  { path: "/icons", title: "Icons", icon: "pe-7s-science", class: "" },
  { path: "/maps", title: "Proveedores", icon: "pe-7s-box1", class: "" },
  { path: "/notifications", title: "Productos", icon: "pe-7s-box2"  , class: "" },
  {
    path: "/login",
    title: "Login",
    icon: "pe-7s-users",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
