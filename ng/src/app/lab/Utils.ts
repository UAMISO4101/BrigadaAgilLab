/**
 * Created by felipe.martinez on 23/05/2017.
 */

declare function unescape(s: string): string;
declare function escape(s: string): string;

export default class Utils {

    public static FORMATO_FECHA = "dd/MM/yyyy";

    /**
     * base 64 string
     * @param val string a serializar
     * @returns {string} base 64 representacion
     */
    static serializar(val: string) {
        // return btoa(unescape(encodeURIComponent(val)));
        return unescape(encodeURIComponent(val));
    }

    /**
     * @param val base 64 string a deserializar
     * @returns {string} string plano
     */
    static deserializar(b64: string) {
        // return decodeURIComponent(escape(atob(b64)));
        return decodeURIComponent(escape(b64));
    }

    static obj2String(obj: any) {
        return JSON.stringify(obj);
    }

    static json2Obj(json: string) {
        return JSON.parse(json);
    }


}
