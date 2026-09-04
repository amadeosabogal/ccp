export default function Estatuto() {
  const articulos = [
    {
      numero: 1,
      titulo: 'NATURALEZA JURÍDICA',
      contenido: `La Congregación Cristiana en el Perú es una Asociación Civil Religiosa, de Derecho Privado, sin fines de lucro, constituida al amparo de la Constitución Política del Perú, del Código Civil y de las demás normas aplicables a las entidades religiosas, dotada de personería jurídica propia, patrimonio independiente y duración indeterminada.

La Congregación desarrolla exclusivamente fines religiosos, espirituales, pastorales, benéficos y de servicio a la comunidad, careciendo de finalidad lucrativa y destinando la totalidad de sus bienes y recursos al cumplimiento de sus fines institucionales.`
    },
    {
      numero: 2,
      titulo: 'IDENTIDAD INSTITUCIONAL',
      contenido: `La Congregación fundamenta su existencia, organización y funcionamiento en la doctrina apostólica contenida en las Sagradas Escrituras, reconociendo únicamente como cabeza suprema de la Iglesia a Nuestro Señor Jesucristo y como guía permanente al Espíritu Santo.

Todas las actuaciones de sus órganos de gobierno, administración y ministerio deberán desarrollarse respetando esta identidad doctrinal y los principios espirituales que inspiran a la Congregación.`
    },
    {
      numero: 3,
      titulo: 'PRINCIPIO DE AUTONOMÍA RELIGIOSA',
      contenido: `La Congregación ejerce libremente su organización, gobierno interno, disciplina, culto, ministerio y administración conforme a la Constitución Política del Perú y a la legislación nacional, sin perjuicio del cumplimiento de las obligaciones legales que correspondan como persona jurídica.`
    },
    {
      numero: 4,
      titulo: 'INTERPRETACIÓN DEL ESTATUTO',
      contenido: `Las disposiciones del presente Estatuto deberán interpretarse de manera sistemática, armónica y conforme a la doctrina apostólica profesada por la Congregación; los principios contenidos en las Sagradas Escrituras; la Constitución Política del Perú; el Código Civil; y, la normativa aplicable a las entidades religiosas.

En ningún caso la interpretación de este Estatuto podrá alterar la naturaleza religiosa, los fines espirituales o la identidad institucional de la Congregación.`
    },
    {
      numero: 5,
      titulo: 'DENOMINACIÓN',
      contenido: `La Asociación adopta la denominación de Congregación Cristiana en el Perú, esta denominación será utilizada en todos los actos civiles, administrativos, registrales, judiciales y extrajudiciales.`
    },
    {
      numero: 6,
      titulo: 'FINALIDAD',
      contenido: `La Congregación tiene como finalidad principal la propagación del Evangelio de Nuestro Señor Jesucristo conforme a la doctrina apostólica, promoviendo el culto público, la edificación espiritual de sus miembros y la difusión de los principios cristianos contenidos en las Sagradas Escrituras.

Para el cumplimiento de sus fines podrá desarrollar, entre otras, las siguientes actividades: celebrar cultos y reuniones religiosas; administrar casas de oración; realizar actividades de evangelización; promover la formación espiritual de sus miembros; desarrollar actividades de asistencia social y de beneficencia; brindar ayuda solidaria a personas necesitadas; realizar actividades educativas y de formación bíblica; editar, imprimir y distribuir Biblias, himnarios, literatura y demás material religioso; y, realizar toda actividad compatible con su naturaleza religiosa.`
    },
    {
      numero: 7,
      titulo: 'PRINCIPIOS FUNDAMENTALES',
      contenido: `La Congregación se rige por los siguientes principios: obediencia a las Sagradas Escrituras; unidad doctrinal; comunión espiritual entre sus miembros; autonomía religiosa; administración responsable del patrimonio; gratuidad del ministerio; ausencia de fines de lucro; y, respeto a la legislación peruana.`
    },
    {
      numero: 11,
      titulo: 'DOMICILIO',
      contenido: `El domicilio legal de la Congregación se encuentra ubicado en el Jirón Paz Soldán N.° 349, Distrito del Callao, Provincia Constitucional del Callao, sin perjuicio del funcionamiento de casas de oración, locales religiosos, dependencias administrativas o representaciones en cualquier lugar del territorio nacional.`
    },
    {
      numero: 12,
      titulo: 'DURACIÓN',
      contenido: `La duración de la Congregación es indeterminada.`
    },
    {
      numero: 13,
      titulo: 'PATRIMONIO',
      contenido: `El patrimonio de la Congregación está constituido por: bienes muebles e inmuebles; ofrendas y colectas voluntarias; donaciones, legados y liberalidades; derechos patrimoniales; cuentas bancarias e inversiones permitidas por ley; Biblias, himnarios y demás bienes destinados al culto; y cualquier otro bien adquirido conforme al ordenamiento jurídico.

Todo el patrimonio se encuentra afectado exclusivamente al cumplimiento de los fines institucionales.`
    },
    {
      numero: 14,
      titulo: 'RECURSOS ECONÓMICOS',
      contenido: `Constituyen recursos económicos de la Congregación: ofrendas voluntarias; colectas; donaciones nacionales o extranjeras; rendimientos financieros; ingresos provenientes de actividades compatibles con sus fines; y cualquier ingreso permitido por la legislación vigente.

En ningún caso los recursos podrán distribuirse entre los asociados, administradores o integrantes del ministerio espiritual; así como no generan ningún tipo de derecho, en tiempo alguno y bajo ningún concepto, para cualquiera de sus miembros.`
    },
    {
      numero: 15,
      titulo: 'DESTINO DEL PATRIMONIO',
      contenido: `Todos los bienes y recursos de la Congregación deberán destinarse exclusivamente al cumplimiento de sus fines religiosos, espirituales, pastorales, educativos, benéficos y administrativos.

Ningún asociado podrá reclamar derecho alguno sobre el patrimonio social por su sola condición de miembro de la Congregación.`
    },
    {
      numero: 29,
      titulo: 'NATURALEZA DEL MINISTERIO ESPIRITUAL',
      contenido: `El Ministerio Espiritual constituye el órgano encargado de la conducción doctrinal, pastoral y espiritual de la Congregación Cristiana en el Perú.

Su actuación se inspira exclusivamente en las Sagradas Escrituras, la doctrina apostólica y la guía del Espíritu Santo, preservando la unidad doctrinal, la comunión espiritual y la misión evangelizadora de la Congregación.

Las decisiones adoptadas en el ámbito estrictamente doctrinal, litúrgico, pastoral y disciplinario corresponden exclusivamente al Ministerio Espiritual, sin perjuicio de las competencias que el presente Estatuto reconoce a la Asamblea General y a la Administración respecto de los asuntos civiles, administrativos y patrimoniales.`
    },
    {
      numero: 30,
      titulo: 'INTEGRACIÓN',
      contenido: `El Ministerio Espiritual está integrado por:

a) Los Ancianos;
b) Los Cooperadores del Oficio Ministerial;
c) Los Cooperadores de Jóvenes y Niños;
d) Los Diáconos.

Cada uno ejercerá las funciones propias de su ministerio conforme a las Sagradas Escrituras, la doctrina de la Congregación y las disposiciones del presente Estatuto.`
    },
    {
      numero: 39,
      titulo: 'SEPARACIÓN DEL MINISTERIO',
      contenido: `Los integrantes del Ministerio Espiritual podrán dejar de ejercer sus funciones por:

a) Renuncia;
b) Fallecimiento;
c) Incapacidad permanente;
d) Traslado ministerial;
e) Aceptación de compromisos contrarios a los principios de la Congregación o que impliquen una ausencia inevitable a las reuniones o que impidan atender puntualmente las exigencias del cargo o función;
f) Falta de idoneidad moral o espiritual que les inhabilite para el cargo o función; deshonestidad o desidia;
g) Quiebra de la fidelidad a la doctrina, a la disciplina ministerial o a la comunión con los demás miembros del Ministerio Espiritual;
h) Decisión del Consejo de Ancianos Más Antiguos del Perú, adoptada conforme a la doctrina de la Congregación.

Las decisiones relativas al ejercicio del ministerio tienen naturaleza eminentemente religiosa y corresponden exclusivamente al Consejo de Ancianos.`
    },
    {
      numero: 40,
      titulo: 'AUTONOMÍA DEL MINISTERIO ESPIRITUAL',
      contenido: `Ningún órgano administrativo podrá intervenir en dichas materias. Las decisiones del Ministerio Espiritual relacionadas con la fe, doctrina, disciplina religiosa, liturgia, sacramentos, ministerio, culto y organización espiritual constituyen manifestaciones de la autonomía religiosa reconocida por la Constitución Política del Perú.`
    },
    {
      numero: 41,
      titulo: 'SEPARACIÓN DE FUNCIONES ESPIRITUALES Y ADMINISTRATIVAS',
      contenido: `El ejercicio de funciones ministeriales es independiente del desempeño de cargos administrativos.

Ninguna persona podrá ejercer simultáneamente funciones que generen incompatibilidad entre la conducción espiritual y la administración patrimonial de la Congregación, conforme a los principios establecidos en el presente Estatuto.`
    },
    {
      numero: 42,
      titulo: 'NATURALEZA Y COMPOSICIÓN DE LA ASAMBLEA GENERAL',
      contenido: `La Asamblea General es el órgano supremo de deliberación y decisión de la Congregación Cristiana en el Perú en todos aquellos asuntos de naturaleza institucional, civil y administrativa que le corresponden conforme al presente Estatuto y a la legislación peruana aplicable.

La Asamblea General está conformada por la totalidad de asociados inscritos en el Libro Padrón de Asociados que tengan la condición de hábiles para ejercer sus derechos asociativos.

La Asamblea General ejercerá sus atribuciones respetando en todo momento la autonomía religiosa y doctrinal de la Congregación, correspondiendo exclusivamente al Consejo de Ancianos la conducción de los asuntos relacionados con la fe, la doctrina, el culto, la inclusión o la exclusión de los miembros del Ministerio Espiritual y de la disciplina religiosa.`
    },
    {
      numero: 43,
      titulo: 'CLASES DE ASAMBLEA GENERAL',
      contenido: `La Asamblea General puede ser:

a) Asamblea General Ordinaria: Aquella que se celebra periódicamente conforme al presente Estatuto, principalmente para conocer los informes institucionales, administrativos, económicos y demás asuntos propios del funcionamiento ordinario de la Congregación.

b) Asamblea General Extraordinaria: Aquella convocada para tratar asuntos específicos que, por su naturaleza o urgencia, requieran una decisión especial de los asociados.`
    },
    {
      numero: 44,
      titulo: 'ASAMBLEA UNIVERSAL',
      contenido: `La Asamblea General podrá celebrarse con carácter universal cuando se encuentren presentes la totalidad de asociados hábiles con derecho a participar y exista voluntad unánime de celebrar la reunión y adoptar acuerdos.

En dicho supuesto, no será necesaria convocatoria previa, dejándose constancia expresa en el acta de:

a) La asistencia de la totalidad de asociados hábiles;
b) La aceptación unánime de celebrar la asamblea;
c) La agenda materia de deliberación;
d) La adopción de acuerdos conforme a las mayorías previstas en el presente Estatuto.

La Asamblea Universal tendrá plena validez para todos los efectos legales y registrales conforme a la normativa aplicable.`
    },
    {
      numero: 45,
      titulo: 'CONVOCATORIA A ASAMBLEA GENERAL',
      contenido: `La convocatoria a Asamblea General será efectuada por el Presidente de la Administración, por acuerdo de la Administración o cuando corresponda conforme a la legislación vigente.

La convocatoria deberá indicar:

a) Lugar, fecha y hora de celebración;
b) Tipo de asamblea;
c) Agenda específica;
d) Primera y segunda convocatoria cuando corresponda.

La convocatoria podrá realizarse mediante comunicación escrita dirigida a los asociados, publicación en la sede institucional, comunicación interna u otro medio que permita acreditar razonablemente que los asociados han tomado conocimiento de la reunión.

La Asamblea General solo podrá ocurrir en la sede de la Congregación, designada en el Artículo 11°.`
    },
    {
      numero: 46,
      titulo: 'PLAZO DE CONVOCATORIA',
      contenido: `Salvo los casos de Asamblea Universal, la convocatoria deberá efectuarse con una anticipación no menor de diez (10) días calendario. Cuando circunstancias excepcionales lo justifiquen, la Administración podrá convocar a Asamblea Extraordinaria con una anticipación menor, siempre que se garantice el conocimiento efectivo de los asociados y su participación.`
    },
    {
      numero: 47,
      titulo: 'PRESIDENCIA Y SECRETARÍA DE LA ASAMBLEA',
      contenido: `La Asamblea General será presidida por el Presidente de la Administración o por quien estatutariamente lo sustituya. Actuará como Secretario quien ejerza dicho cargo dentro de la Administración.

En caso de ausencia o impedimento, la propia Asamblea podrá designar a las personas que desempeñarán dichas funciones únicamente para la respectiva sesión, que incluso podría ser uno o dos miembros del Consejo de Ancianos que atienda a la localidad.`
    },
    {
      numero: 48,
      titulo: 'QUÓRUM DE INSTALACIÓN',
      contenido: `La Asamblea General se instalará conforme a las siguientes reglas:

a) En primera convocatoria, con la concurrencia de más de la mitad de los asociados hábiles.
b) En segunda convocatoria, podrá instalarse con los asociados que se encuentren presentes, salvo aquellos casos en que la ley o el presente Estatuto establezcan una mayoría especial.

La existencia del quórum deberá constar expresamente en el acta correspondiente.`
    },
    {
      numero: 49,
      titulo: 'ADOPCIÓN DE ACUERDOS',
      contenido: `Los acuerdos de la Asamblea General se adoptarán por mayoría simple de los asociados asistentes, salvo las materias que requieran una mayoría especial conforme al presente Estatuto o la legislación vigente.

Los acuerdos deberán constar en el Libro de Actas de Asamblea General, debidamente suscritos por quienes ejerzan la presidencia y secretaría de la sesión.`
    },
    {
      numero: 50,
      titulo: 'FORMA DE VOTACIÓN',
      contenido: `Las votaciones podrán realizarse:

a) Por manifestación expresa de los asociados;
b) Por aclamación;
c) Por votación escrita cuando la Asamblea así lo determine.

Cuando la totalidad de asistentes manifieste su conformidad unánime con un acuerdo, ello deberá dejarse expresamente indicado en el acta.`
    },
    {
      numero: 51,
      titulo: 'ATRIBUCIONES DE LA ASAMBLEA GENERAL',
      contenido: `Son atribuciones de la Asamblea General:

a) Aprobar y modificar el Estatuto conforme al procedimiento establecido;
b) Elegir, nombrar y remover, cuando corresponda, a los miembros de la Administración;
c) Aprobar los informes de gestión institucional;
d) Aprobar los estados financieros y la información económica de la Congregación;
e) Aprobar la designación de representantes legales cuando corresponda;
f) Acordar la adquisición, disposición o actos extraordinarios sobre bienes conforme al procedimiento previsto en el presente Estatuto;
g) Aprobar la disolución y liquidación de la Congregación conforme al presente Estatuto y la legislación aplicable;
h) Resolver cualquier asunto institucional que no corresponda expresamente a otro órgano.`
    },
    {
      numero: 52,
      titulo: 'LIMITACIÓN DE COMPETENCIA DE LA ASAMBLEA GENERAL',
      contenido: `La Asamblea General no podrá intervenir ni modificar asuntos propios de la autonomía religiosa de la Congregación, tales como:

a) Interpretación doctrinal;
b) Contenido de la fe;
c) Forma de culto;
d) Administración de sacramentos;
e) Designación o remoción espiritual de ministros;
f) Disciplina religiosa;
g) Cambios en la composición del Ministerio Espiritual.

Dichas materias corresponden exclusivamente al Consejo de Ancianos conforme al presente Estatuto.`
    },
    {
      numero: 53,
      titulo: 'MODIFICACIÓN DEL ESTATUTO',
      contenido: `La modificación del presente Estatuto requiere:

a) Que la propuesta haya sido previamente evaluada por el Consejo de Ancianos;
b) Que sea sometida a consideración de Asamblea General convocada expresamente para dicho fin;
c) Que se cumplan los quórums y mayorías establecidos en el presente Estatuto y en la legislación vigente.

Toda modificación deberá respetar necesariamente:

a) La naturaleza religiosa de la Congregación;
b) Sus fines espirituales;
c) Su autonomía doctrinal;
d) Su identidad institucional.`
    },
    {
      numero: 54,
      titulo: 'DISOLUCIÓN DE LA CONGREGACIÓN',
      contenido: `La disolución de la Congregación requerirá acuerdo de Asamblea General Extraordinaria convocada expresamente para dicho fin.

El acuerdo deberá adoptarse con la mayoría calificada establecida por la legislación vigente y el presente Estatuto.

En ningún caso la disolución podrá acordarse desconociendo la naturaleza religiosa, la finalidad institucional ni el destino patrimonial previsto en el presente Estatuto.

Para la disolución, después de cumplido con lo previsto en el presente Estatuto, se requiere la presencia de la totalidad de los asociados, tanto en la primera, cuanto en la segunda convocatoria y la disolución será considerada aprobada solamente con la unanimidad de votos de todos los presentes.`
    },
    {
      numero: 55,
      titulo: 'LIBRO DE ACTAS',
      contenido: `Los acuerdos de Asamblea General deberán constar en el Libro de Actas correspondiente, legalizado conforme a ley.

Las actas deberán contener:

a) Fecha, hora y lugar de reunión;
b) Forma de convocatoria;
c) Relación de asistentes;
d) Verificación del quórum;
e) Agenda;
f) Deliberaciones principales;
g) Acuerdos adoptados;
h) Firmas correspondientes.`
    },
    {
      numero: 56,
      titulo: 'NATURALEZA DE LA ADMINISTRACIÓN',
      contenido: `La Administración, denominada también Consejo Directivo, es el órgano encargado de la gestión civil, administrativa, económica y patrimonial de la Congregación Cristiana en el Perú.

La Administración actúa como órgano de representación de la persona jurídica ante autoridades públicas, entidades privadas, instituciones financieras, organismos administrativos, notarías y Registros Públicos, dentro del marco establecido por el presente Estatuto.

La Administración ejercerá sus funciones en armonía con los principios, fines y orientación espiritual de la Congregación, respetando la autonomía del Ministerio Espiritual en los asuntos de fe, doctrina y culto.`
    },
    {
      numero: 57,
      titulo: 'INTEGRACIÓN DE LA ADMINISTRACIÓN',
      contenido: `La Administración estará integrada por los siguientes cargos:

a) Presidente;
b) Vicepresidente;
c) Secretario;
d) Vicesecretario;
e) Tesorero;
f) Vicetesorero.

Asimismo, podrán designarse otros colaboradores administrativos cuando las necesidades institucionales lo requieran, nombrados como auxiliares administrativos.

Los cargos de la Administración serán ejercidos con carácter gratuito y voluntario, conforme a lo establecido en el presente Estatuto.`
    },
    {
      numero: 58,
      titulo: 'DESIGNACIÓN DE LOS MIEMBROS DE LA ADMINISTRACIÓN',
      contenido: `Los miembros de la Administración serán propuestos por indicación del Consejo de Ancianos de la Congregación y aprobados por la Asamblea General.

La designación deberá constar en el Libro de Actas correspondiente y podrá ser elevada a escritura pública cuando corresponda para su inscripción en los Registros Públicos.

La designación de cargos administrativos no implica atribución de funciones ministeriales ni modificación espiritual de la Congregación.`
    },
    {
      numero: 59,
      titulo: 'DURACIÓN DEL MANDATO',
      contenido: `El mandato de los miembros de la Administración será de tres (03) años, pudiendo ser renovados por períodos sucesivos.

Los miembros que sean designados para cubrir vacancias ejercerán sus funciones hasta completar el período del titular sustituido.`
    },
    {
      numero: 60,
      titulo: 'VACANCIA DE CARGOS',
      contenido: `El cargo de miembro de la Administración vaca por:

a) Fallecimiento;
b) Renuncia escrita;
c) Incapacidad permanente;
d) Conclusión del período;
e) Remoción acordada conforme al presente Estatuto;
f) Aceptación de compromisos contrarios a los principios de la Congregación o que impliquen una ausencia inevitable a las reuniones o que impidan atender puntualmente las exigencias del cargo o función;
g) Falta de idoneidad moral o espiritual que les inhabilite para el cargo o función; deshonestidad o desidia;
h) Quiebra de la fidelidad a la doctrina, a la disciplina ministerial o a la comunión con los demás miembros del Ministerio Espiritual;
i) Decisión del Consejo de Ancianos Más Antiguos de Perú, adoptada conforme a la doctrina de la Congregación.
j) Cualquier otra causa prevista por la legislación aplicable.`
    },
    {
      numero: 61,
      titulo: 'FUNCIONES GENERALES DE LA ADMINISTRACIÓN',
      contenido: `Son funciones generales de la Administración:

a) Ejecutar los acuerdos adoptados por la Asamblea General;
b) Administrar los bienes, derechos y recursos de la Congregación;
c) Representar legalmente a la Congregación ante toda clase de autoridades y entidades;
d) Celebrar actos y contratos necesarios para el cumplimiento de los fines institucionales;
e) Llevar adecuadamente los libros institucionales, administrativos y contables;
f) Mantener actualizado el patrimonio de la Congregación;
g) Presentar informes de gestión cuando corresponda;
h) Realizar todos aquellos actos necesarios para el funcionamiento ordinario de la persona jurídica.

Los actos de administración del patrimonio de la Congregación Cristiana en el Perú que excedan la simple gestión, incluyendo la compra, aceptar donaciones, venta y dar en donación de bienes inmuebles, serán previamente presentados a Dios en oración conjunta del Consejo de Ancianos y Diáconos y la Administración en la "Reunión General Ministerial", para obtener de Él la confirmación; así como las construcciones y/o reformas de inmuebles serán llevadas a consideración en referida reunión, haciéndose constar en el Acta de la "Reunión General Ministerial" seguidamente, dicha deliberación se realizará en la sede central descrita en el Artículo 11°.`
    },
    {
      numero: 62,
      titulo: 'REPRESENTACIÓN LEGAL',
      contenido: `La representación legal de la Congregación Cristiana en el Perú corresponde al Presidente de la Administración.

El Presidente podrá representar a la Congregación:

a) Judicialmente;
b) Extrajudicialmente;
c) Administrativamente;
d) Ante entidades públicas y privadas;
e) Ante notarías y Registros Públicos.

Podrá ejercer esta representación directamente o mediante otorgamiento de poderes conforme a ley.`
    },
    {
      numero: 63,
      titulo: 'FACULTADES GENERALES DEL PRESIDENTE',
      contenido: `Corresponde al Presidente o en su ausencia, por el Vicepresidente:

a) Representar a la Congregación ante toda clase de autoridades administrativas, judiciales, arbitrales, notariales y registrales;
b) Convocar y presidir las Asambleas Generales;
c) Ejecutar los acuerdos institucionales;
d) Suscribir documentos públicos y privados necesarios para la marcha institucional;
e) Gestionar conjuntamente con los responsables correspondientes las cuentas bancarias de la Congregación;
f) Otorgar poderes específicos cuando sean necesarios para actos determinados, esto con previa anuencia del Consejo de Ancianos;
g) Ejercer las demás facultades previstas en el presente Estatuto.`
    },
    {
      numero: 64,
      titulo: 'FACULTADES ESPECIALES DE REPRESENTACIÓN ADMINISTRATIVA Y REGISTRAL',
      contenido: `El Presidente, y por sustitución cualquiera de los miembros titulares de la Administración debidamente facultado, podrá representar a la Congregación ante:

a) Superintendencia Nacional de los Registros Públicos – SUNARP;
b) Superintendencia Nacional de Aduanas y de Administración Tributaria – SUNAT;
c) Ministerio de Justicia y Derechos Humanos;
d) Municipalidades provinciales y distritales;
e) Gobiernos regionales;
f) Entidades administrativas nacionales;
g) Empresas prestadoras de servicios públicos;
h) Cualquier entidad pública o privada.

Para tal efecto podrá: presentar solicitudes; formular declaraciones juradas; presentar escritos; efectuar trámites administrativos; solicitar certificados; recoger documentos; realizar pagos; subsanar observaciones; interponer recursos administrativos; firmar formularios y documentos necesarios.

La Congregación podrá otorgar, a miembros de la misma fe, poderes para representarla, con poderes específicos de administración y plazo no excedente de un año, desde su concesión, con previa autorización escrita del Consejo de Ancianos.`
    },
    {
      numero: 65,
      titulo: 'FACULTADES ANTE SUNARP',
      contenido: `La representación ante SUNARP comprende, entre otras, las siguientes facultades:

a) Solicitar inscripciones registrales;
b) Presentar títulos;
c) Efectuar seguimiento de procedimientos;
d) Presentar escritos de aclaración, desistimiento o subsanación;
e) Recoger partes notariales, copias certificadas y documentos registrales;
f) Formular oposición u observaciones cuando corresponda;
g) Realizar todos los actos necesarios para lograr la inscripción de acuerdos sociales, poderes, nombramientos, adquisiciones, transferencias y demás actos registrables.`
    },
    {
      numero: 66,
      titulo: 'FACULTADES ANTE SUNAT',
      contenido: `El Presidente podrá representar a la Congregación ante SUNAT con facultades para:

a) Realizar trámites relacionados con el Registro Único de Contribuyentes;
b) Solicitar modificaciones o actualizaciones de información;
c) Presentar declaraciones y formularios;
d) Gestionar claves, accesos y registros correspondientes;
e) Efectuar cualquier trámite necesario para el cumplimiento de obligaciones tributarias.`
    },
    {
      numero: 67,
      titulo: 'FACULTADES BANCARIAS',
      contenido: `La Administración podrá abrir, cerrar y administrar cuentas bancarias, financieras o similares a nombre de la Congregación.

Para tal efecto podrá:

a) Abrir cuentas corrientes, cuentas de ahorro y depósitos;
b) Efectuar depósitos y retiros;
c) Emitir, girar, endosar y cobrar cheques;
d) Realizar transferencias bancarias;
e) Solicitar estados de cuenta;
f) Gestionar tarjetas, medios electrónicos o servicios financieros;
g) Suscribir contratos bancarios.

Los movimientos bancarios deberán realizarse conforme a los controles internos establecidos por la Administración.`
    },
    {
      numero: 68,
      titulo: 'ADQUISICIÓN Y ADMINISTRACIÓN DE BIENES',
      contenido: `Corresponde a la Administración gestionar el patrimonio de la Congregación.

Para ello podrá:

a) Adquirir bienes muebles e inmuebles;
b) Celebrar contratos necesarios para el funcionamiento institucional;
c) Administrar propiedades;
d) Contratar servicios;
e) Realizar actos de conservación y mantenimiento patrimonial.

Los actos de disposición extraordinaria de bienes inmuebles deberán contar previamente con la aprobación conforme al procedimiento establecido en el presente Estatuto.`
    },
    {
      numero: 69,
      titulo: 'FACULTADES NOTARIALES',
      contenido: `El Presidente podrá otorgar y suscribir:

a) Minutas;
b) Escrituras públicas;
c) Declaraciones juradas;
d) Contratos;
e) Aclaraciones;
f) Rectificaciones; documentos complementarios.

Asimismo, podrá efectuar todos los actos necesarios para formalizar acuerdos aprobados por los órganos competentes.`
    },
    {
      numero: 70,
      titulo: 'FACULTADES DEL SECRETARIO',
      contenido: `Corresponde al Secretario, en su ausencia por el Vicesecretario:

a) Custodiar los libros institucionales;
b) Redactar y conservar las actas;
c) Elaborar comunicaciones oficiales;
d) Certificar documentos internos cuando corresponda;
e) Colaborar con la representación administrativa;
f) Gestionar las cuentas bancarias conjuntamente con el Presidente, el Tesorero o sus sustitutos.`
    },
    {
      numero: 71,
      titulo: 'FACULTADES DEL TESORERO',
      contenido: `Corresponde al Tesorero o, en su ausencia, por el Vicetesorero:

a) Custodiar la documentación económica;
b) Llevar control financiero;
c) Efectuar registros económicos;
d) Preparar información financiera;
e) Participar en la gestión bancaria conforme a las autorizaciones correspondientes;
f) Gestionar las cuentas bancarias conjuntamente con el Presidente, o el Secretario.`
    },
    {
      numero: 72,
      titulo: 'RESPONSABILIDAD DE LOS ADMINISTRADORES',
      contenido: `Los miembros de la Administración responden frente a la Congregación y frente a terceros por los actos realizados con dolo, abuso de facultades o negligencia grave conforme a la legislación vigente.

La responsabilidad no alcanza a los actos realizados dentro del ejercicio regular de sus funciones y conforme a los acuerdos válidamente adoptados por los órganos competentes.`
    },
    {
      numero: 73,
      titulo: 'PROHIBICIONES A LA ADMINISTRACIÓN',
      contenido: `Está terminantemente prohibido a la Administración:

a) Intervenir en el Ministerio de la Congregación Cristiana en el Perú, no pudiendo instituir, destituir ni apartar a sus miembros;
b) Abonar, avalar, prestar fianza o cualquier garantía y endosar títulos a favor de terceros, en nombre de la Congregación Cristiana en el Perú;
c) Actuar en nombre de la Congregación Cristiana en el Perú, junto a entidades gubernamentales o privadas, auxilios o subvenciones de cualquier naturaleza;
d) Utilizar cualquiera de los bienes o valores pertenecientes a la Congregación Cristiana en el Perú, para fines distintos a los intereses de la misma.`
    },
    {
      numero: 74,
      titulo: 'NATURALEZA DEL CONSEJO FISCAL',
      contenido: `El Consejo Fiscal es el órgano encargado de supervisar y revisar la gestión económica, financiera y patrimonial de la Congregación Cristiana en el Perú, actuando con independencia respecto de la Administración.

Su función principal consiste en verificar que la administración de los recursos institucionales se realice conforme al presente Estatuto, a los acuerdos de la Asamblea General y a las disposiciones legales aplicables.

El Consejo Fiscal no interviene en asuntos de naturaleza espiritual, doctrinal o ministerial, los cuales corresponden exclusivamente al Ministerio Espiritual.`
    },
    {
      numero: 75,
      titulo: 'COMPOSICIÓN DEL CONSEJO FISCAL',
      contenido: `El Consejo Fiscal estará integrado por un mínimo de uno (01) y un máximo de tres (03) miembros titulares.

La Asamblea General podrá designar, cuando lo considere conveniente, miembros suplentes para cubrir eventuales vacancias. Los integrantes del Consejo Fiscal deberán ser asociados hábiles y actuarán con independencia, responsabilidad y diligencia.`
    },
    {
      numero: 76,
      titulo: 'DESIGNACIÓN Y DURACIÓN DEL CARGO',
      contenido: `Los miembros del Consejo Fiscal serán indicados por el Consejo de Ancianos y designados por la Asamblea General conforme al procedimiento establecido en el presente Estatuto.

El período de funciones será de tres (03) años, pudiendo ser renovados.

Los miembros que sean designados para reemplazar vacancias ejercerán sus funciones por el período restante correspondiente al titular sustituido.`
    },
    {
      numero: 77,
      titulo: 'IMPEDIMENTOS',
      contenido: `No podrán integrar simultáneamente el Consejo Fiscal:

a) Los miembros titulares de la Administración;
b) Quienes ejerzan funciones de manejo directo de fondos institucionales;
c) Aquellas personas que tengan conflicto de intereses respecto de la gestión económica de la Congregación.

Esta limitación tiene por finalidad preservar la transparencia y adecuada supervisión institucional.`
    },
    {
      numero: 78,
      titulo: 'ATRIBUCIONES DEL CONSEJO FISCAL',
      contenido: `Son atribuciones del Consejo Fiscal:

a) Revisar los estados financieros y documentación económica de la Congregación;
b) Verificar la correcta administración del patrimonio institucional;
c) Revisar los libros contables y documentación sustentadora;
d) Emitir informes sobre la gestión económica cuando corresponda;
e) Formular recomendaciones a la Administración;
f) Informar a la Asamblea General sobre sus conclusiones;
g) Ejercer las demás funciones compatibles con su naturaleza.`
    },
    {
      numero: 84,
      titulo: 'DESTINO DE LOS RECURSOS INSTITUCIONALES',
      contenido: `Los recursos económicos, bienes y derechos de la Congregación serán destinados exclusivamente al cumplimiento de sus fines religiosos, espirituales, administrativos y asistenciales.

En ningún caso podrán distribuirse directa o indirectamente entre los asociados, miembros del Ministerio Espiritual, administradores o terceros.`
    },
    {
      numero: 105,
      titulo: 'MODIFICACIÓN DEL ESTATUTO',
      contenido: `El presente Estatuto podrá ser modificado únicamente mediante acuerdo adoptado por la Asamblea General Extraordinaria convocada específicamente para tal finalidad, de conformidad con las disposiciones establecidas en el presente Estatuto y la legislación vigente.

La modificación estatutaria deberá respetar en todo momento:

a) La naturaleza religiosa y espiritual de la Congregación Cristiana en el Perú;
b) Sus principios doctrinales y finalidad institucional;
c) Su condición de Asociación Civil Religiosa sin fines de lucro;
d) La autonomía de organización interna reconocida por la legislación peruana.`
    },
    {
      numero: 106,
      titulo: 'PROCEDIMIENTO PREVIO PARA LA MODIFICACIÓN ESTATUTARIA',
      contenido: `Antes de someter cualquier propuesta de modificación estatutaria a consideración de la Asamblea General, la propuesta deberá ser previamente evaluada por el Consejo de Ancianos Más Antiguos del Perú, cuando corresponda conforme a la organización espiritual interna de la Congregación.

Dicha evaluación tendrá como finalidad verificar que las modificaciones propuestas:

a) No afecten la esencia espiritual y doctrinal de la Congregación;
b) No contradigan los principios establecidos en el presente Estatuto;
c) Permitan una adecuada organización administrativa e institucional.

El pronunciamiento del Consejo de Ancianos constará en el acta correspondiente.`
    },
    {
      numero: 107,
      titulo: 'CONVOCATORIA DE ASAMBLEA GENERAL EXTRAORDINARIA PARA MODIFICACIÓN DEL ESTATUTO',
      contenido: `La Asamblea General Extraordinaria destinada a modificar el Estatuto será convocada por el órgano competente conforme al presente Estatuto.

La convocatoria deberá indicar expresamente:

a) Fecha, hora y lugar de celebración;
b) Modalidad de realización cuando corresponda;
c) Agenda específica referida a la modificación estatutaria;
d) Los artículos materia de modificación o la propuesta de nuevo texto estatutario.

No podrán adoptarse acuerdos sobre materias distintas a aquellas expresamente señaladas en la convocatoria, salvo que la totalidad de asociados hábiles se encuentren presentes y acepten por unanimidad ampliar la agenda.`
    },
    {
      numero: 108,
      titulo: 'QUÓRUM Y ADOPCIÓN DE ACUERDOS PARA MODIFICACIÓN ESTATUTARIA',
      contenido: `Para la modificación del Estatuto se observarán las siguientes reglas:

a) En primera convocatoria, la Asamblea General Extraordinaria quedará válidamente instalada con la concurrencia de más de la mitad de los asociados hábiles.
b) En segunda convocatoria, la Asamblea General Extraordinaria podrá instalarse con los asociados que concurran, siempre que la ley o el presente Estatuto no establezcan una exigencia superior.
c) Los acuerdos serán adoptados con el voto favorable de la mayoría exigida por la legislación vigente y el presente Estatuto.

Cuando la modificación implique una nueva redacción integral del Estatuto, la Asamblea podrá aprobar un texto consolidado que sustituya al anterior.`
    },
    {
      numero: 109,
      titulo: 'ASAMBLEA UNIVERSAL',
      contenido: `Sin perjuicio del procedimiento ordinario de convocatoria, podrá celebrarse Asamblea General Universal cuando se encuentren presentes la totalidad de los asociados hábiles y éstos acepten por unanimidad la celebración de la Asamblea y la agenda propuesta.

En dicho supuesto se dejará constancia expresa en el acta de:

a) La presencia de la totalidad de asociados hábiles;
b) La aceptación unánime de la celebración de la Asamblea;
c) La aprobación unánime de la agenda;
d) Los acuerdos adoptados.

La Asamblea Universal tendrá plena validez conforme a la legislación civil aplicable.`
    },
    {
      numero: 110,
      titulo: 'CAUSALES DE DISOLUCIÓN',
      contenido: `La Congregación Cristiana en el Perú podrá disolverse por:

a) Cuando fuera comprobado que no existen más fieles que sigan la misma fe y doctrina en todo el territorio del Estado peruano;
b) Acuerdo de la Asamblea General Extraordinaria convocada expresamente para dicho fin;
c) Imposibilidad permanente de cumplir sus fines;
d) Las demás causas previstas por la legislación peruana;
e) Mandato judicial conforme a ley.

La disolución deberá respetar siempre la naturaleza religiosa y la finalidad no lucrativa de la institución.`
    },
    {
      numero: 111,
      titulo: 'ACUERDO DE DISOLUCIÓN',
      contenido: `El acuerdo de disolución deberá ser adoptado por la Asamblea General Extraordinaria Universal con el quórum y mayoría establecidos en el presente Estatuto y la normativa vigente.

El acta correspondiente deberá contener:

a) La causal de disolución;
b) La declaración expresa de voluntad de disolver la institución;
c) La designación de los liquidadores;
d) Las facultades otorgadas para ejecutar el proceso de liquidación.

La Asamblea General Extraordinaria Universal solamente podrá ser realizada en la sede de la Congregación, determinada en el Artículo 11°.`
    },
    {
      numero: 112,
      titulo: 'COMISIÓN LIQUIDADORA',
      contenido: `Acordada la disolución, la Asamblea General Universal designará una Comisión Liquidadora integrada por las personas que considere necesarias.

La Comisión Liquidadora tendrá las siguientes facultades:

a) Representar a la Congregación durante el proceso de liquidación;
b) Elaborar el inventario de bienes, derechos y obligaciones;
c) Concluir operaciones pendientes;
d) Pagar las obligaciones existentes;
e) Realizar los actos necesarios para la liquidación;
f) Elaborar el balance final de liquidación.`
    },
    {
      numero: 113,
      titulo: 'OBLIGACIONES DURANTE LA LIQUIDACIÓN',
      contenido: `Durante el proceso de liquidación, la Congregación conservará su personalidad jurídica únicamente para efectos de concluir dicho proceso.

La Comisión Liquidadora deberá actuar respetando:

a) Las obligaciones legales vigentes;
b) Los derechos de terceros;
c) La finalidad institucional;
d) La prohibición de distribuir el patrimonio entre asociados.`
    },
    {
      numero: 114,
      titulo: 'DESTINO DEL PATRIMONIO REMANENTE',
      contenido: `Una vez culminado el proceso de liquidación y canceladas todas las obligaciones pendientes, el patrimonio remanente será destinado a otra entidad sin fines de lucro que tenga fines religiosos, asistenciales, educativos o de beneficencia, conforme al acuerdo adoptado por la Asamblea General Extraordinaria.

En ningún caso el patrimonio podrá ser distribuido directa o indirectamente entre los asociados, miembros del Ministerio Espiritual, administradores o terceros vinculados.`
    },
    {
      numero: 115,
      titulo: 'PROTECCIÓN DE LA DENOMINACIÓN INSTITUCIONAL',
      contenido: `La denominación "Congregación Cristiana en el Perú" así como sus signos distintivos, documentos institucionales, símbolos, himnarios, materiales religiosos, registros y demás elementos identificativos pertenecen exclusivamente a la institución.`
    },
    {
      numero: 117,
      titulo: 'APLICACIÓN SUPLETORIA DE LA LEGISLACIÓN PERUANA',
      contenido: `En todo aquello no previsto expresamente en el presente Estatuto serán aplicables las disposiciones del Código Civil peruano, la Ley de Libertad Religiosa, su reglamento y demás normas complementarias aplicables.`
    },
    {
      numero: 118,
      titulo: 'VIGENCIA DEL ESTATUTO MODIFICADO',
      contenido: `El presente Estatuto, aprobado por la Asamblea General Extraordinaria de Asociados celebrada el día 25 de julio de 2026, entrará en vigencia desde la fecha de aprobación del acuerdo social correspondiente, sin perjuicio de su posterior elevación a escritura pública e inscripción en los Registros Públicos cuando corresponda.

La presente versión constituye el texto integral, ordenado y consolidado del Estatuto Social de la Congregación Cristiana en el Perú, sustituyendo íntegramente cualquier texto estatutario anterior.`
    },
    {
      numero: 119,
      titulo: 'DEROGACIÓN DEL ESTATUTO ANTERIOR',
      contenido: `Con la aprobación del presente Estatuto queda expresamente derogado cualquier Estatuto, modificación estatutaria, reglamento interno o disposición anterior que resulte incompatible con el presente texto.

La derogación comprende únicamente las disposiciones internas que sean sustituidas por el presente Estatuto, manteniéndose plenamente vigentes los actos jurídicos realizados por la Congregación durante su existencia, siempre que no sean contrarios al presente instrumento.`
    },
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="border-b border-gray-200 pb-4">
        <p className="text-gray-500 mt-1">
          Texto integral aprobado por la Asamblea General Extraordinaria — 25 de julio de 2026
        </p>
      </header>

      <div className="space-y-6">
        {articulos.map((art) => (
          <section
            key={art.numero}
            id={`articulo-${art.numero}`}
            className="border-l-4 border-ccb-blue pl-5 py-1"
          >
            <h2 className="font-bold text-ccb-blue uppercase tracking-widest mb-1">
              Artículo {art.numero}
            </h2>
            <h3 className="font-semibold text-gray-900 mb-3">
              {art.titulo}
            </h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {art.contenido}
            </div>
          </section>
        ))}
      </div>

    </article>
  );
}
