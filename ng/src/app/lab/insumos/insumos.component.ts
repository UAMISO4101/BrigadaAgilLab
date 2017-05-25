import {Component, OnInit} from "@angular/core";
import {Insumo} from "./insumo";
import {InsumosService} from "./insumos.service";
import {LabelsService} from "../labels.service";
import {ActivatedRoute} from "@angular/router";
// declare var jQuery:any;

@Component({
    selector: "lab-insumos",
    templateUrl: "insumos.component.html"
})

export class InsumosComponent implements OnInit {
    _: {};
    list: Insumo[] = [];
    listP: Insumo[] = [];
    list2: Insumo[] = [];
    itemInsumoD: Insumo = {
        id: 0,
        nombre: "---",
        descripcion: "---",
        precio: "$0.0",
        unidad: "---",
        provedor: "---",
        estado: 0,
        imagen: "",
    };
    itemInsumo: Insumo;
    itemInsumoP: Insumo;
    search = "";
    selectedOrder = "-nombre";
    protocolo_id:number;

    constructor(private _insumoService: InsumosService, private _labelsService: LabelsService, route: ActivatedRoute) {
        this.protocolo_id = route.snapshot.params["id"];
        this._ = _labelsService.getLabels();

    }


    ngOnInit(): void {

        this.getInsumos();
        this.getInsumosP();
    }


    getInsumos() {
        //this.list = this._insumoService.listInsumos(5, this.search, this.selectedOrder);
        this._insumoService.getListInsumos().subscribe(
                product => this.list = product,
                error => console.log(<any>error),
                this.dd
        );
        this.itemInsumo = this.list.length > 0 ? this.list[0] : this.itemInsumoD;
        this.itemInsumo.imagen = this._insumoService.getImagen();
    }

    dd(){


    }

    clicked(item: Insumo) {
        this.itemInsumo = item;
        this.itemInsumo.imagen = this._insumoService.getImagen();
    }

    getInsumosP() {
        this.listP = this._insumoService.listInsumos(5, this.search, this.selectedOrder);
        this.itemInsumoP = this.listP.length > 0 ? this.listP[0] : this.itemInsumoD;
    }

    clickedP(item: Insumo) {
        this.itemInsumoP = item;
    }

}
