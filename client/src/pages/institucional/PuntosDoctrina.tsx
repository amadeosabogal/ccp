import { useLanguage } from '../../context/LanguageContext';

export default function PuntosDoctrina() {
  const { language } = useLanguage();

  const doctrinas = {
    Portugués: [
      "Nós cremos na inteira Bíblia Sagrada e aceitamo-La como contendo a infalível Palavra de Deus, inspirada pelo Espírito Santo. A Palavra de Deus é a única e perfeita guia da nossa fé e conduta, e a Ela nada se pode acrescentar ou d'Ela diminuir. É, também, o poder de Deus para salvação de todo aquele que crê. (II Pedro, 1:21; II Timóteo, 3:16-17; Romanos, 1:16)",
      "Nós cremos que há um só Deus vivente e verdadeiro, eterno e de infinito poder, Criador de todas as coisas, em cuja unidade estão o Pai, o Filho e o Espírito Santo. (Efésios, 4:6; Mateus, 28:19; I João, 5:7)",
      "Nós cremos que Jesus Cristo, o Filho de Deus, é a Palavra feita carne, havendo assumido uma natureza humana no ventre de Maria virgem, possuindo Ele, por conseguinte, duas naturezas, a divina e a humana; por isso é chamado verdadeiro Deus e verdadeiro homem e é o único Salvador, pois sofreu a morte pela culpa de todos os homens. (Lucas, 1:27,35; João, 1:14; I Pedro, 3:18)",
      "Nós cremos na existência pessoal do diabo e de seus anjos, maus espíritos que, junto a ele, serão punidos no fogo eterno. (Mateus, 25:41)",
      "Nós cremos que o novo nascimento e a regeneração só se recebem pela fé em Jesus Cristo, que pelos nossos pecados foi entregue e ressuscitou para nossa justificação. Os que estão em Cristo Jesus são novas criaturas. Jesus Cristo, para nós, foi feito por Deus sabedoria, justiça, santificação e redenção. (Romanos, 3:24-25; I Coríntios, 1:30; II Coríntios, 5:17)",
      "Nós cremos no batismo na água, com uma só imersão, em Nome de Jesus Cristo (Atos, 2:38) e em Nome do Pai e do Filho e do Espírito Santo. (Mateus, 28:18-19)",
      "Nós cremos no batismo do Espírito Santo, com evidência de novas línguas, conforme o Espírito Santo concede que se fale. (Atos, 2:4; 10:45-47; 19:6)",
      "Nós cremos na Santa Ceia. Jesus Cristo, na noite em que foi traído, tomando o pão e havendo dado graças, partiu-o e deu-o aos discípulos, dizendo: \"Isto é o meu corpo, que por vós é dado; fazei isto em memória de mim\". Semelhantemente tomou o cálice, depois da ceia, dizendo: \"Este cálice é o Novo Testamento no meu sangue, que é derramado por vós\". (Lucas, 22:19-20; I Coríntios, 11:24-25)",
      "Nós cremos na necessidade de nos abster das coisas sacrificadas aos ídolos, do sangue, da carne sufocada e da fornicação, conforme mostrou o Espírito Santo na Assembléia de Jerusalém. (Atos, 15:28-29; 16:4; 21:25)",
      "Nós cremos que Jesus Cristo tomou sobre Si as nossas enfermidades. \"Está alguém entre vós doente? Chame os presbíteros da igreja, e orem sobre ele, ungindo-o com azeite em nome do Senhor. E a oração da fé salvará o doente, e o Senhor o levantará; e se houver cometido pecados, ser-lhe-ão perdoados\". (Mateus, 8:17; Tiago, 5:14-15)",
      "Nós cremos que o mesmo Senhor (antes do milênio) descerá do céu com alarido, com voz de arcanjo e com a trombeta de Deus; e os que morreram em Cristo ressuscitarão primeiro. Depois nós, os que ficarmos vivos, seremos arrebatados juntamente com eles nas nuvens, a encontrar o Senhor nos ares e assim estaremos sempre com o Senhor. (I Tessalonicenses, 4:16-17; Apocalipse, 20:6)",
      "Nós cremos que haverá a ressurreição corporal dos mortos, justos e injustos. Estes irão para o tormento eterno, mas os justos para a vida eterna. (Atos, 24:15; Mateus, 25:46)"
    ],
    Español: [
      "Nosotros creemos en la entera Biblia Sagrada y la aceptamos como conteniendo la infalible Palabra de Dios, inspirada por el Espíritu Santo. La Palabra de Dios es la única y perfecta guía de nuestra fe y conducta, y a Ella nada se puede añadir o de Ella disminuir. Es, también, el poder de Dios para salvación de todo aquel que cree. (II Pedro, 1:21; II Timoteo, 3:16-17; Romanos, 1:16)",
      "Nosotros creemos que hay un solo Dios viviente y verdadero, eterno y de infinito poder, Creador de todas las cosas, en cuya unidad están el Padre, el Hijo y el Espíritu Santo. (Efesios, 4:6; Mateo, 28:19; I Juan, 5:7)",
      "Nosotros creemos que Jesucristo, el Hijo de Dios, es la Palabra hecha carne, habiendo asumido una naturaleza humana en el vientre de la virgen María, poseyendo Él, por consiguiente, dos naturalezas, la divina y la humana; por eso es llamado verdadero Dios y verdadero hombre y es el único Salvador, pues sufrió la muerte por la culpa de todos los hombres. (Lucas, 1:27,35; Juan, 1:14; I Pedro, 3:18)",
      "Nosotros creemos en la existencia personal del diablo y de sus ángeles, malos espíritus que, junto a él, serán castigados en el fuego eterno. (Mateo, 25:41)",
      "Nosotros creemos que el nuevo nacimiento y la regeneración solo se reciben por la fe en Jesucristo, que por nuestros pecados fue entregado y resucitó para nuestra justificación. Los que están en Cristo Jesús son nuevas criaturas. Jesucristo, para nosotros, fue hecho por Dios sabiduría, justicia, santificación y redención. (Romanos, 3:24-25; I Corintios, 1:30; II Corintios, 5:17)",
      "Nosotros creemos en el bautismo en agua, con una sola inmersión, en el Nombre de Jesucristo (Hechos, 2:38) y en el Nombre del Padre y del Hijo y del Espíritu Santo. (Mateo, 28:18-19)",
      "Nosotros creemos en el bautismo del Espíritu Santo, con evidencia de nuevas lenguas, conforme el Espíritu Santo concede que se hable. (Hechos, 2:4; 10:45-47; 19:6)",
      "Nosotros creemos en la Santa Cena. Jesucristo, en la noche en que fue traicionado, tomando el pan y habiendo dado gracias, lo partió y lo dio a los discípulos, diciendo: \"Esto es mi cuerpo, que por vosotros es dado; haced esto en memoria de mí\". Semejantemente tomó el cáliz, después de la cena, diciendo: \"Este cáliz es el Nuevo Testamento en mi sangre, que es derramada por vosotros\". (Lucas, 22:19-20; I Corintios, 11:24-25)",
      "Nosotros creemos en la necesidad de abstenernos de las cosas sacrificadas a los ídolos, de sangre, de carne sofocada y de fornicación, conforme mostró el Espíritu Santo en la Asamblea de Jerusalén. (Hechos, 15:28-29; 16:4; 21:25)",
      "Nosotros creemos que Jesucristo tomó sobre Sí nuestras enfermedades. \"¿Está alguno enfermo entre vosotros? Llame a los presbíteros de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor. Y la oración de fe salvará al enfermo, y el Señor lo levantará; y si hubiere cometido pecados, le serán perdonados\". (Mateo, 8:17; Santiago, 5:14-15)",
      "Nosotros creemos que el mismo Señor (antes del milenio) descenderá del cielo con aclamación, con voz de arcángel y con trompeta de Dios; y los muertos en Cristo resucitarán primero. Luego nosotros, los que vivamos, los que hayamos quedado, seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire, y así estaremos siempre con el Señor. (I Tesalonicenses, 4:16-17; Apocalipsis, 20:6)",
      "Nosotros creemos que habrá la resurrección corporal de los muertos, justos e injustos. Estos irán al tormento eterno, mas los justos a la vida eterna. (Hechos, 24:15; Mateo, 25:46)"
    ],
    Inglés: [
      "We believe in the entire Holy Bible and accept It as containing the infallible Word of God, inspired by the Holy Spirit. The Word of God is the only and perfect guide for our faith and conduct, and to It nothing can be added or taken away. It is also the power of God for the salvation of everyone who believes. (II Peter 1:21; II Timothy 3:16-17; Romans 1:16)",
      "We believe there is only one living and true God, eternal and of infinite power, Creator of all things, in whose unity are the Father, the Son, and the Holy Spirit. (Ephesians 4:6; Matthew 28:19; I John 5:7)",
      "We believe that Jesus Christ, the Son of God, is the Word made flesh, having assumed a human nature in the womb of the virgin Mary, thereby possessing two natures, the divine and the human; therefore He is called true God and true man, and is the only Savior, for He suffered death for the guilt of all men. (Luke 1:27, 35; John 1:14; I Peter 3:18)",
      "We believe in the personal existence of the devil and his angels, evil spirits who, together with him, will be punished in the eternal fire. (Matthew 25:41)",
      "We believe that the new birth and regeneration are only received by faith in Jesus Christ, who was delivered for our offenses and raised again for our justification. Those who are in Christ Jesus are new creatures. Jesus Christ is made unto us by God wisdom, righteousness, sanctification, and redemption. (Romans 3:24-25; I Corinthians 1:30; II Corinthians 5:17)",
      "We believe in water baptism, with a single immersion, in the Name of Jesus Christ (Acts 2:38) and in the Name of the Father, and of the Son, and of the Holy Spirit. (Matthew 28:18-19)",
      "We believe in the baptism of the Holy Spirit, with the evidence of new tongues, as the Holy Spirit gives utterance. (Acts 2:4; 10:45-47; 19:6)",
      "We believe in the Holy Supper. Jesus Christ, on the night He was betrayed, took bread, and when He had given thanks, He broke it and gave it to His disciples, saying: \"This is my body, which is given for you; do this in remembrance of me.\" Likewise, He took the cup after supper, saying: \"This cup is the New Testament in my blood, which is shed for you.\" (Luke 22:19-20; I Corinthians 11:24-25)",
      "We believe in the necessity of abstaining from things sacrificed to idols, from blood, from things strangled, and from fornication, as the Holy Spirit showed in the Assembly of Jerusalem. (Acts 15:28-29; 16:4; 21:25)",
      "We believe that Jesus Christ took upon Himself our infirmities. \"Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in faith will make the sick person well; the Lord will raise them up. If they have sinned, they will be forgiven.\" (Matthew 8:17; James 5:14-15)",
      "We believe that the Lord Himself (before the millennium) will descend from heaven with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air. And so we will be with the Lord forever. (I Thessalonians 4:16-17; Revelation 20:6)",
      "We believe that there will be a bodily resurrection of the dead, both of the just and the unjust. The latter will go away into eternal punishment, but the righteous into eternal life. (Acts 24:15; Matthew 25:46)"
    ]
  };

  const currentDoctrinas = doctrinas[language] || doctrinas['Español'];

  return (
    <div className="max-w-4xl mx-auto mb-16 p-6">
      <ol className="list-decimal pl-5 space-y-4 text-gray-700 leading-relaxed text-justify marker:text-gray-700">
        {currentDoctrinas.map((punto, idx) => (
          <li key={idx} className="pl-1">
            {punto}
          </li>
        ))}
      </ol>
    </div>
  );
}
