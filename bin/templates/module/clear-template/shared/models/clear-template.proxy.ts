import IProxy = puremvc.IProxy;
import Proxy = puremvc.Proxy;
import 'rxjs/add/operator/map';

import { EventEmitter } from "@angular/core";
import { Response } from '@angular/http';

import { EventsService } from "../../../../shared/services/events/events.service";
import { AppNotifications } from "../../../../main/notifications/app-notifications";
import { ClearTemplateService } from "../services/clear-template.service";
import { Observable } from "rxjs";

import { LoginEvents } from "../../../login/constants/login.events";

export class ClearTemplateProxy extends Proxy implements IProxy {

  public static NAME: string = "ClearTemplateProxy.NAME";

  public service: ClearTemplateService;

  constructor(data?: any) {

    super(ClearTemplateProxy.NAME, data);

    let event: EventEmitter<any> = EventsService.get(LoginEvents.GET_TOKEN);
    event.subscribe(() => this.onGetToken());

  }

  private onGetToken() {

    this.sendNotification(AppNotifications.AUTH_GRANTED);

  }

}
