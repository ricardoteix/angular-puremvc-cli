import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../shared/services/authentication/auth.guard.service";
import { ModulosConstants } from "../gerenciar-modulos/shared/constants/modulos.constants";
import { PermissaoConstants } from "../../shared/constants/permissao.constants";
import { ClearTemplateFormComponent } from "./form/form.component";

const routes: Routes = [
	{
		path: '',
		component: ClearTemplateFormComponent,
		canActivate: [AuthGuard],
		data: {
			modules: [ModulosConstants.CLEAR_TEMPLATE],
			permission: PermissaoConstants.READ
		}
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
