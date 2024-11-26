// Asistentes

// Representación completa de un asistente
export interface IAsistente {
    id: number;
    nombre: string;
    evento: string;
    estado: boolean;
    password: string;
  }
  
  // Datos para crear un nuevo asistente
  export interface INuevoAsistente {
    nombre: string;
    evento: string;
    estado: boolean;
    password: string;
  }
  
  // QRd
  
  // Datos para generar un QR
  export interface AsistenteQr {
    nombreAsistente: string;
    eventoAsistente: string;
    nombreUsuario: string;
  }
  
  // Representación completa de un QR (incluye ID)
  export interface AsistenteQrCompleto {
    id: string;
    nombreAsistente: string;
    eventoAsistente: string;
    nombreUsuario: string;
  }
  