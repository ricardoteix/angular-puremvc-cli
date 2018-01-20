import IFacade = puremvc.IFacade;
import ICommand = puremvc.ICommand;
import SimpleCommand = puremvc.SimpleCommand;

import {AppFacade} from "../../../../../../application-facade";
import {ClearTemplateNotifications} from "../../notifications/clear-template.notifications";
import {ClearTemplateProxy} from "../../models/clear-template.proxy";

export class ClearTemplateCommand extends SimpleCommand implements ICommand {

  execute(notification) {

    let facade:IFacade = AppFacade.getInstance(AppFacade.APP_STARTUP);

    switch(notification.getName()) {

      case ClearTemplateNotifications.STARTUP_CLEAR_TEMPLATE: {

        this.registerAll();
        break;

      }

      case ClearTemplateNotifications.SET_SERVICE: {

        if(!facade.hasProxy(ClearTemplateProxy.NAME)) {
          let proxy: ClearTemplateProxy = new ClearTemplateProxy();
          proxy.service = notification.getBody();
          facade.registerProxy(proxy);
        }else {
          let proxy: ClearTemplateProxy = facade.retrieveProxy(ClearTemplateProxy.NAME) as ClearTemplateProxy;
          if(notification.getBody() != proxy.service) {
            proxy.service = notification.getBody();
          }
        }

        break;
      }
    }
  }

  public registerAll(): void {

    this.registerCommand(ClearTemplateNotifications.SET_SERVICE, ClearTemplateCommand);

  }

  private registerCommand(notificationName:string, CommandClass:any): void {

    let facade:IFacade = AppFacade.getInstance(AppFacade.APP_STARTUP);
    if(!facade.hasCommand(notificationName)) {
      facade.registerCommand(notificationName, CommandClass);
    }

  }

}
