export function datoAcademico(grade, group, career, shift) {
    let aux = group;
    aux += (shift == "M") ? "1" : "2";
    aux += grade + "_" + career;
    return aux;
}
