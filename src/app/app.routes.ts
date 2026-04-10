import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { NotFound } from '../pages/not-found/not-found';
import { EquipmentDetail } from '../pages/equipment-detail/equipment-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'LocNES - Accueil',
    },
    {
        path: 'equipment/:id',
        component: EquipmentDetail,
        title: 'LocNES - Fiche équipement',
    },
    {
        path: '**',
        component: NotFound,
        title: 'Erreur 404',
    },
];
