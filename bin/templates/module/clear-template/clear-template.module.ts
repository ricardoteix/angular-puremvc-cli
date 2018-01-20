import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {AppFacade} from "../../../application-facade";
import {ClearTemplateNotifications} from "./shared/notifications/clear-template.notifications";
import {ClearTemplateFormComponent} from "./form/form.component";
import {routing} from "./clear-template.routing";
import {ClearTemplateCommand} from "./shared/controllers/command/clear-template.command";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ClearTemplateFormComponent
  ],
  exports: []
})

export class ClearTemplateModule {


  constructor () {

    var facade:AppFacade = AppFacade.getInstance(AppFacade.APP_STARTUP);
    facade.registerCommand(ClearTemplateNotifications.STARTUP_CLEAR_TEMPLATE, ClearTemplateCommand);
    facade.sendNotification(ClearTemplateNotifications.STARTUP_CLE

  }

}
