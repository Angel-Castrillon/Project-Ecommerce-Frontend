import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    // { icon: 'home', label: 'Inicio', route: '/' },
    // { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'products', label: 'Productos', route: '/products' },
    // { icon: 'orders', label: 'Mis Pedidos', route: '/orders' },
    // { icon: 'warranty', label: 'Mis Garantías', route: '/warranties' },
    // { icon: 'users', label: 'Clientes', route: '/clients' },
    // { icon: 'integrations', label: 'Mis Integraciones', route: '/integrations' },
    // { icon: 'history', label: 'Historial de Cartera', route: '/wallet-history' },
    // { icon: 'referrals', label: 'Mis Referidos', route: '/referrals' },
    // { icon: 'config', label: 'Configuraciones', route: '/settings', isNew: true },
    // { icon: 'calendar', label: 'Calendario', route: '/calendar' },
    // { icon: 'marketing', label: 'Marketing', route: '/marketing' },
    // { icon: 'reports', label: 'Reportes', route: '/reports', isNew: true },
    // { icon: 'invoices', label: 'Facturas', route: '/invoices' },
    // { icon: 'transport', label: 'Transportadora', route: '/transport' },
    // { icon: 'card', label: 'Dropi Card', route: '/dropi-card', isNew: true },
    // { icon: 'gas', label: 'GAS', route: '/gas' },
    // { icon: 'academy', label: 'Academy', route: '/academy', isNew: true },
  ];
}
