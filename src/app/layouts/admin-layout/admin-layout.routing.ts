import { Routes } from '@angular/router';

import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { HeroDetailComponent } from '../../hero-detail/hero-detail.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    {
        path: 'login',
        component: LoginComponent,
      },
];
