import {Component, OnInit} from "@angular/core";
import {ExperimentoService} from "./experimento.service";
import {Experimentos} from "./experimento";
import {ProtocoloService} from "../protocolo/service/protocolo.service";
import {Protocolo} from "../protocolo/service/protocolo";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'experimento-protocolo',
    moduleId: module.id,
    templateUrl: 'experimento.asociar.protocolo.component.html',
    providers: [ProtocoloService, ExperimentoService]
})
export class ExperimentoAsociarProtocoloComponent implements OnInit {

    public protocolo: Protocolo[] = [];
    public protocolos: Protocolo[] = [];
    public idExperimento: string;
    public experimento: Experimentos;
    public show: string;

    constructor(private _experimentoService: ExperimentoService,
                private _protocoloService: ProtocoloService,
                route: ActivatedRoute) {
        this.idExperimento = route.snapshot.params['id'];

    }

    onSelect(item) {
        this.protocolo = item;
        this.show = "true";

    }

    getProtocolos() {
        this._protocoloService.listarProtocolos().subscribe((protocolos: Protocolo[]) => this.protocolos = protocolos);
    }

    getExperimento() {
        this._experimentoService.getExperimentos().subscribe((experimento: Experimentos[]) =>
                this.experimento = experimento.filter(p => p.id == this.idExperimento).pop(),
            error => console.log(error),
            () => this.asociarProtocolo(this.experimento, this.protocolo))
    }

    asociarProtocolo(experimento, protocolo) {

        if (!experimento["protocolos"])
            experimento["protocolos"] = [];
        experimento["protocolos"].push(protocolo);

        this._experimentoService.asociarProtocolo(experimento, protocolo)
            .subscribe(res => console.log("success"), error => console.log(error),
            () => window.history.back());

    }

    ngOnInit() {
        this.getProtocolos();
        window.scrollTo(0, 0);
    }
}
