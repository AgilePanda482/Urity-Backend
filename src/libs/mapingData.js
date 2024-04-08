export function transformarDatosArray(arrayObjetos) {
    return arrayObjetos.map(objeto => transformarDatos(objeto));
}

function transformarDatos(objeto) {
    const mapeoTurnos = {
      'M': 'Matutino',
      'V': 'Vespertino',
    };
  
    const mapeoCarreras = {
      'BTDS': 'Desarrollo de Software',
      'BTDI': 'Diseño Industrial',
      'BGC': 'General por Competencias',
      'BGA': 'General por Areas Interdisciplinarias',
    };
  
    // Mapear 'Turno'
    if (objeto.turno && mapeoTurnos[objeto.turno]) {
      objeto.turno = mapeoTurnos[objeto.turno];
    }
  
    // Mapear 'carrera'
    if (objeto.carrera && mapeoCarreras[objeto.carrera]) {
      objeto.carrera = mapeoCarreras[objeto.carrera];
    }
  
    // Retorna el objeto transformado
    return objeto;
}