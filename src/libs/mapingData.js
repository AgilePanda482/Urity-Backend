export function transformarDatosArray(arrayObjetos) {
  return arrayObjetos.map(objeto => transformarDatos(objeto));
}

function transformarDatos(objeto) {
  const mapeoTurnos = {
    'M': 'Matutino',
    'V': 'Vespertino',
  };

  const mapeoCarreras = {
    'BTW': 'Desarrollo de Software',
    'BTI': 'Diseño Industrial',
    'BGC': 'General por Competencias',
    'BGA': 'General por Areas Interdisciplinarias',
  };

  const mapeoLocalizaciones = {
    '1': 'Dentro',
    '0': 'Fuera',
    null: 'Desconocido',
  }

  // Mapear 'Turno'
  if (objeto.turno && mapeoTurnos[objeto.turno]) {
    objeto.turno = mapeoTurnos[objeto.turno];
  }

  // Mapear 'carrera'
  if (objeto.carrera && mapeoCarreras[objeto.carrera]) {
    objeto.carrera = mapeoCarreras[objeto.carrera];
  }

  // Mapear 'localizacionAlumno'
  if (mapeoLocalizaciones.hasOwnProperty(objeto.localizacionAlumno)) {
    objeto.localizacionAlumno = mapeoLocalizaciones[objeto.localizacionAlumno];
  }

  // Retorna el objeto transformado
  return objeto;
}