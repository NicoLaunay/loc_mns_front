import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { EquipmentDetail } from './pages/equipment-detail/equipment-detail';
import { Login } from './pages/login/login';
import { Exemple } from './pages/exemple/exemple';
import { ExempleDetailAccreditation } from './pages/exemple-detail-accreditation/exemple-detail-accreditation';
import { ExempleEditAccreditation } from './pages/exemple-edit-accreditation/exemple-edit-accreditation';
import { RequestForm } from './pages/request-form/request-form';
import { NewLoanForm } from './pages/new-loan-form/new-loan-form';
import { AdminHome } from './pages/admin-home/admin-home';
import { NewTypeForm } from './pages/new-type-form/new-type-form';
import { NewModelForm } from './pages/new-model-form/new-model-form';

export const routes: Routes = [
    {
        path: 'home/user',
        component: Home,
        title: 'LocNES - Accueil',
    },
    {
        path: 'home/admin',
        component: AdminHome,
        title: 'LocNES - Accueil Admin',
    },
    {
        path: 'login',
        component: Login,
        title: 'LocNES - Login',
    },
    {
        path: 'new-loan',
        component: NewLoanForm,
        title: 'LocNES - Nouvelle Réservation',
    },
    {
        path: 'new-type',
        component: NewTypeForm,
        title: 'LocNES - Nouveau Type',
    },
    {
        path: 'new-modele',
        component: NewModelForm,
        title: 'LocNES - Nouveau Modèle',
    },
    {
        path: 'equipment/:id',
        component: EquipmentDetail,
        title: 'LocNES - Fiche équipement',
    },
    {
        path: 'equipment/:id/request',
        component: RequestForm,
        title: 'LocNES - Demande Gestionnaire',
    },
    {
        path: 'exemple',
        component: Exemple,
        title: 'exemple',
    },
    {
        path: 'exemple-accreditation/update/:id',
        component: ExempleEditAccreditation,
        title: 'exemple edit accred',
    },
    {
        path: 'exemple-accreditation/create',
        component: ExempleEditAccreditation,
        title: 'exemple edit accred',
    },
    {
        path: 'exemple-detail-accreditation/:id',
        component: ExempleDetailAccreditation,
        title: 'exemple détails accred',
    },
    {
        path: '**',
        component: NotFound,
        title: 'Erreur 404',
    },
];
