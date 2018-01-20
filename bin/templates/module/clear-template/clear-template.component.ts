import INotification = puremvc.INotification;
import {AfterViewInit, Component, NgZone, OnInit} from "@angular/core";
import {TelaBase} from "../core/tela/tela-base";
import {AppNotifications} from "../../main/notifications/app-notifications";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../shared/services/config/config.service";
import {ClearTemplateService} from "./shared/services/clear-template.service";
import {ClearTemplateNotifications} from "./shared/notifications/clear-template.notifications";
import {ClearTemplate} from "./shared/models/clear-template.model";
import {ResponseBody} from "../../shared/response/response-body.model";
import {AlertaConfig} from "../../shared/model/alerta-config/alerta-config.model";
import {AlertaUtil} from "../../shared/utils/alerta.util";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'clear-template',
    templateUrl: './clear-template.component.html',
    styleUrls: ['./clear-template.component.scss'],
    providers: [ClearTemplateService]
})

export class ClearTemplateComponent extends TelaBase implements OnInit {

    public static NAME = "ClearTemplateComponent.NAME";

    public loadSpin: boolean;

    private router: Router;
    private activatedRoute: ActivatedRoute;
    private zone: NgZone;
    private config: ConfigService;

    constructor(router: Router, activatedRoute: ActivatedRoute, zone: NgZone, config: ConfigService, clearTemplateService: ClearTemplateService) {

        super(ClearTemplateComponent.NAME);

        this.titulo = "ClearTemplate";

        this.loadSpin = true;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.zone = zone;
        this.config = config;

        this.sendNotification(AppNotifications.REGISTER_MEDIATOR, this);
        this.sendNotification(ClearTemplateNotifications.SET_SERVICE, clearTemplateService);

    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public listNotificationInterests(): string[] {

        return [
            
        ];

    }


    public handleNotification(notification: INotification): void {

        let notificationName: string = notification.getName();

        switch (notificationName) {

            /*case ClearTemplateNotifications.SUCCESS_GET_CLEAR_TEMPLATE: {

                break;
            }*/

        }

    }

    private afterSuccessGetClearTemplate(clearTemplate: ClearTemplate): void {

        this.loadSpin = false;

    }

    private afterFailureGetClearTemplate(responseBody: ResponseBody): void {

        this.loadSpin = false;

        let config: AlertaConfig = new AlertaConfig({
            title: 'Falha!',
            text: 'Ocorreu uma erro ao resgatar os dados da estatistica, tente novamente.',
            type: 'error'
        });

        AlertaUtil.show(responseBody.response, config);

        this.router.navigate(['/clear-template']);

    }


    private getClearTemplate(): void {

        this.loadSpin = true;
        this.sendNotification(ClearTemplateNotifications.GET_CLEAR_TEMPLATE);

    }

}
