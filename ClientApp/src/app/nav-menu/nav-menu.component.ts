import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/shared/services/auth.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logOut() {
    this.authService.logout();
  }
}
