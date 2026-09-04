export interface CCBDropdownItem {
  Text: string;
  Value: string;
  capital?: number;
}

export interface CCBDropdownResponse {
  list: CCBDropdownItem[];
}

export interface SearchServiceParams {
  codigoPais: string;
  codigoEstado: string;
  codigoCidade: string;
  tipoCulto: string[];
  diaSemana: string[];
  periodo: string[];
  pagina: number;
}
