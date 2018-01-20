import {Injectable}    from '@angular/core';
import {Http, Headers} from "@angular/http";
import {ConfigService} from "../../../../shared/services/config/config.service";
import {Observable} from "rxjs/Rx";
import {ClearTemplate} from "../models/clear-template.model";
import {Service} from "../../../../shared/services/base.service";

@Injectable()
export class ClearTemplateService extends Service {

  private http: Http;
  private config: ConfigService;

  constructor(http: Http, config: ConfigService) {

    super();

    this.http = http;
    this.config = config;

  }

}
