import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { EquipmentDetail } from './pages/equipment-detail/equipment-detail';
import { Login } from './pages/exemple-login/login';
// import { Exemple } from './pages/exemple/exemple';
// import { ExempleDetailAccreditation } from './pages/exemple-detail-accreditation/exemple-detail-accreditation';
// import { ExempleEditAccreditation } from './pages/exemple-edit-accreditation/exemple-edit-accreditation';
import { RequestForm } from './pages/request-form/request-form';
import { EditLoanForm } from './pages/edit-loan-form/edit-loan-form';
import { AdminHome } from './pages/admin-home/admin-home';
import { NewTypeForm } from './pages/new-type-form/new-type-form';
import { NewModelForm } from './pages/new-model-form/new-model-form';
import { userGuard } from './guards/user-guard';
import { adminGuard } from './guards/admin-guard';
import { homeGuard } from './guards/home-guard';
import { EditLoanValidation } from './pages/edit-loan-validation/edit-loan-validation';

export const routes: Routes = [
    { path: '', component: Home, title: 'LocNES - Accueil', canActivate:[userGuard, homeGuard] },
    { path: 'home', component: Home, title: 'LocNES - Accueil', canActivate:[userGuard, homeGuard] },
    { path: 'home-admin', component: AdminHome, title: 'LocNES - Accueil Admin', canActivate:[adminGuard] },
    { path: 'login', component: Login, title: 'LocNES - Login' },
    
    { path: 'edit-loan/validation', component: EditLoanValidation, title: 'LocNES - Nouvelle Réservation', canActivate:[userGuard] },
    { path: 'edit-loan/:id/validation', component: EditLoanValidation, title: 'LocNES - Nouvelle Réservation', canActivate:[userGuard] },
    { path: 'edit-loan', component: EditLoanForm, title: 'LocNES - Nouvelle Réservation', canActivate:[userGuard] },
    { path: 'edit-loan/:id', component: EditLoanForm, title: 'LocNES - Nouvelle Réservation', canActivate:[userGuard] },
    
    { path: 'edit-type', component: NewTypeForm, title: 'LocNES - Nouveau Type', canActivate:[adminGuard] },
    { path: 'edit-modele', component: NewModelForm, title: 'LocNES - Nouveau Modèle', canActivate:[adminGuard] },
    { path: 'equipment/:id', component: EquipmentDetail, title: 'LocNES - Fiche équipement', canActivate:[userGuard] },
    { path: 'equipment/:id/request', component: RequestForm, title: 'LocNES - Demande Gestionnaire', canActivate:[userGuard] },
    
    // { path: 'exemple', component: Exemple, title: 'exemple', },
    // { path: 'exemple-accreditation/update/:id', component: ExempleEditAccreditation, title: 'exemple edit accred', },
    // { path: 'exemple-accreditation/create', component: ExempleEditAccreditation, title: 'exemple edit accred',},
    // { path: 'exemple-detail-accreditation/:id', component: ExempleDetailAccreditation, title: 'exemple détails accred',},
    
    { path: '**', component: NotFound, title: 'Erreur 404', },
];
