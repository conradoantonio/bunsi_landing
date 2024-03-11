export default interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionEn: string;
  image: string;
  width: string;
  caracteristicas: CaracteristicasPropiedad;
  carouselImages: Array<string>;
  conoceMas: ConoceMasPropiedad;

  lat: number;
  lon: number;
}

type CaracteristicasPropiedad = {
  metros: string;
  habitaciones: string;
  banos: string;
  precioMXN: number;
  precioUSD: string;
  fracciones: string;
  disponibles: string;
};

type ConoceMasPropiedad = {
  vision: VisionPropiedad;
  ubicacion: ubicacionPropiedad;
  planos: planosPropiedad;
  specs: specsPropiedad;
  simulador: simuladorPropiedad;
};

type VisionPropiedad = {
  titulo: string;
  image: string;
};

type ubicacionPropiedad = {
  titulo: string;
  image: string;
  lat: number;
  lon: number;
};

type planosPropiedad = {
  titulo: string;
  image: string;
};

type specsPropiedad = {
  titulo: string;
  natural: naturalPropiedad;
  experiencias: experienciasPropiedad;
  social: socialPropiedad;
  cultura: culturaPropiedad;
  salud: saludPropiedad;
};

type naturalPropiedad = {
  playas: Array<playasSpecsPropiedad>;
  montañas: Array<playasSpecsPropiedad>;
};

type playasSpecsPropiedad = {
  id: number;
  nombre: string;
  kilometros: string;
};

type experienciasPropiedad = {
  excursiones: Array<experienciasStructPropiedad>;
  tour: Array<experienciasStructPropiedad>;
};

type experienciasStructPropiedad = {
  id: number;
  nombre: string;
};

type socialPropiedad = {
  restaurantes: Array<socialStructPropiedad>;
  tiendas: Array<socialTiendasStructPropiedad>;
};

type socialStructPropiedad = {
  id: number;
  nombre: string;
};

type socialTiendasStructPropiedad = {
  id: number;
  nombre: string;
  kilometros: string;
};

type culturaPropiedad = {
  musica: Array<experienciasStructPropiedad>;
  deporte: Array<experienciasStructPropiedad>;
};

type saludPropiedad = {
  hospitales: Array<experienciasStructPropiedad>;
};

type simuladorPropiedad = {
  titulo: string;
  image: string;
  inversion: number;
  costovivienda: number;
};
