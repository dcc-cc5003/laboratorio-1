/**
 * 
 * =============================
 *  PREGUNTA 1
 * =============================
 * 
 */

/** 
 * 
 *  a) Significa que typescript verifica los tipos de las variables antes de que se ejecute el codigo.
 *     Las ventajas que tiene esto frente al tipado dinamico es que se pueden detectar errores antes de ejecutar el codigo,
 *     y tambien ayuda a los desarrolladores a entender más el codigo ya que esta documentado de forma más clara.
 * 
 *  b) ANY es un tipo que permite cualquier valor y no tira errores de verificación de tipo, en cambio UNKNOWN es un tipo
 *     que tambien permite cualquier valor pero que SI verifica el tipo antes de usarlo. Es por esto que en el ejemplo con
 *     UNKNOWN, sale el error de "data is of type unknown", mientras que el ejemplo con ANY no tiene ese problema.
 * 
 *  c) Esto significa que en Typescript basta con que dos tipos tengan la misma forma, es decir, que tengan las mismas 
 *     propiedades para que sean considerados del mismo tipo, por ejemplo:
 *     
 *     interface Persona {
 *       nombre: string;
 *     }
 *     
 *     const usuario = {
 *       nombre: "Jorge",
 *       edad: 22,
 *     };
 *
 *     Aca, Usuario es subtipo de Persona, incluso cuando no decimos explícitamente que uno es un subtipo del otro,
 *     ya que tiene por lo menos las mismas propiedades que Persona.
 * 
 */

/**
 * 
 * =============================
 *  PREGUNTA 2
 * =============================
 * 
 */

const data = require('../bakemons.json') as Bakemon[]

interface Bakemon {
  id: number;
  name: string;
  type: string;
  secondary_type?: string; // ? para bakemons que no tiene tipo secundario
  stats: {
    hp: number;
    atk: number;
    def: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
  }
  moves: [{
    name: string;
    description: string;
    power: number | null;
    pp: number;
    priority: number;
  }]
};

/**
 * 
 * =============================
 *  PREGUNTA 3
 * =============================
 * 
 */

function filterByType(bakemons: Bakemon[], type: unknown): unknown {
  const filtro = bakemons.filter(bakemon => bakemon.type === type || bakemon.secondary_type === type);
  return filtro;
}

/**
 * 
 * =============================
 *  PREGUNTA 4
 * =============================
 * 
 */

// Primero creamos el tipo que extiende bakemon y le añade la propiedad BST que nos servira en las proximas dos preguntas
type BakemonConBST = Bakemon & { bst: number };

function addBST(bakemons: Bakemon[]): Array<BakemonConBST> {

  const bakemons_con_bst = bakemons.map(bakemon => {

    // buscamos el objeto stats
    const objeto_stats = Object.values(bakemon.stats);

    // calculamos el bst como la suma de sus stats
    const bst = objeto_stats.reduce((acc, stat) => acc + stat, 0);

    // retornamos el bakemon y añadimos la propiedad bst
    return { ...bakemon, bst };
  });

  return bakemons_con_bst;
}

/**
 * 
 *  Notamos que el tipo de retorno es un arreglo de tipo bakemon al cual le añadimos la propiedad bst,
 *  por lo que podremos acceder a esta propiedad para futuras funciones sin haber modificado la estructura del bakemon.
 * 
 */ 

/**
 * 
 * =============================
 *  PREGUNTA 5
 * =============================
 * 
 */

function findStrongestByType(bakemons: Bakemon[]): { [key:string]: Bakemon } {

  // añadimos bst a los bakemon, primero los mapeamos
  const bakemonsConBst = addBST(bakemons);

  // creamos el diccionario que guardara los bakemons más fuertes por tipo
  const strongestByType: { [key:string]: BakemonConBST } = {};

  bakemonsConBst.forEach(bakemon => {

    // preguntamos si tiene tipo secundario
    const has_secondary_type = bakemon.secondary_type != undefined ? true : false;

    // creamos las llaves en caso de no existir y le añadimos ese bakemon inicialmente
    if (!strongestByType[bakemon.type]) {
      strongestByType[bakemon.type] = bakemon;
    }
    if (has_secondary_type && !strongestByType[bakemon.secondary_type!]) {
      strongestByType[bakemon.secondary_type!] = bakemon;
    }

    // comparamos el bst con el bakemon actual de ese tipo
    if (bakemon.bst > strongestByType[bakemon.type].bst) {
      strongestByType[bakemon.type] = bakemon;
    }
  })

  // Eliminamos la propiedad bst
  const result: { [key: string]: Bakemon } = {};

  Object.entries(strongestByType).forEach(([key, bakemon]) => {
    const { bst, ...bakemonSinBst } = bakemon;
    result[key] = bakemonSinBst;
  });

  return result;
}

/**
 * 
 *  Aca el tipo de retorno es un diccionario donde la llave es el tipo de bakemon y el valor es el bakemon más fuerte de ese tipo.
 *  Notamos que a pesar de que en la funcion añado la propiedad bst, en el retorno no la incluyo, esto ya que del enunciado
 *  supuse que solo debia devolverse el bakemon, sin la propiedad bst. Lo que en tiene cierto sentido ya que no queremos
 *  modificar la estructura del bakemon.
 * 
 */

