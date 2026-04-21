import { Component, inject } from '@angular/core';
import { User } from '../../../features/auth/interfaces';
import { Auth } from '../../../features/auth/service/auth';
import { Menu } from '../../interface/shared.interface';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared-module';


@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, SharedModule],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  public activeRoute: string = '/dashboard/productos'
  public readonly menu: Menu[] = [
    {
      label: 'Productos',
      route: '/dashboard/productos'
    },
    {
      label: 'Perfil',
      route: '/dashboard/perfil'
    }
  ]
  isOpen = false;
  setMenu(route: string) {
    this.activeRoute = route;
  }

  get User(): User {
    return this.auth.getUser()!;
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    this.router.navigate(['/auth/login']);
  }
}
