import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  @ViewChild("sidenav",{static:true}) sidenav: MatSidenav;
  reason = "";
  listItems = [
    "Контрагенты",
    "Аналитика",
    "Персонал",
    "Прайсагрегатор",
    "Сервис",
    "Склады",
    "Справочник",
    "Управление",
    "Финансы",
  ];
  constructor() {}

  ngOnInit(): void {}
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
}
