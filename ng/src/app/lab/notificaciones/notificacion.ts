export interface Notificacion {
    id: string;
    // Insumo, Reserva Equipos
    tipo: string;
    titulo: string;
    proyecto: string;
    experimento: string;
    creador: string;
    campos: any;
    timestamp: number;
}
