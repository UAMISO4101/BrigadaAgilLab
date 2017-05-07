import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "filtro"
})
export class FiltroPipe implements PipeTransform {

    transform(items: Array<any>, valorFiltrar: string, attrs: Array<string>): Array<any> {
        console.log("Objectos a filtrar");
        console.log(items);
        if (valorFiltrar && Array.isArray(items)) {
            return items.filter(item => this.attrMatch(item, valorFiltrar.toLowerCase(), attrs));
        } else {
            return items;
        }
    }

    attrMatch(item: any, valorFiltrar: string, attrs: Array<string>): boolean {
        for (const attr of attrs) {
            const val = item[attr];
            if (typeof val === "string") {
                if (val.toLowerCase().includes(valorFiltrar)) {
                    return true;
                }
            }
        }
        return false;
    }

}
