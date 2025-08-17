/**
 * =============================
 *  PREGUNTA 1
 * =============================
 * 
 * -----------------------------
 * a)
 * 
 * Que Typescript sea de tipado estático significa que tiene
 * una verificación de tipos en tiempo de compilación en vez
 * de en la ejecución. 
 * 
 * Algunas de las ventajas que tiene sobre el tipado dinámico son
 * que permite un mejor control sobre las variables de los programas,
 * además de mantener la consistencia sobre como se tratan los
 * valores.
 * -----------------------------
 * b)
 * 
 * El programa con el tipo "any" no da error en tiempo de compilación, y
 * solo al ejecutarse y llamarlo con el valor numérico "42" entrega
 * un error.
 * 
 * El segundo programa da un error de tipos porque a la variable "data",
 * al ser del tipo "unkown", no se le puede llamar la función "toUpperCase()".
 * 
 * Esto sucede porque el tipo "any" permite "sobrepasar" los chequeos de tipo en
 * typescript, y se puede usar para permitir aceptar variables de cualquier tipo.
 * El tipo "unknown" también representa cualquier valor, pero es más seguro por no
 * permitir llamar funciones ni operar sobre él antes de hacer narrowing.
 * -----------------------------
 * c)
 * 
 * Se refiere a que Typescript compara objetos según su estructura (componentes) y no
 * fijándose en su "nombre". Por ejemplo:
 * 
 * interface Movie {
 * name: string,
 * year: Number,
 * genre: string
 * }
 * 
 * interface Pelicula {
 * name: string, 
 * year: Number,
 * genre: string
 * }
 * 
 * Notamos que, aunque los nombres de las interfaces son distintos, la estructura
 * (los nombres y tipos de sus atributos) son los mismos, por lo que TYpescript los 
 * trata igual.
 * 
 * Por esto, el siguiente programa funciona sin que Typescript lance error de tipo.
 * 
 * function printMovie(m: Movie): void {
 *   console.log(m.name);
 * }
 * 
 * const shrek: Movie = {
 *   name: "shrek",
 *   year: 2003,
 *   genre: "comedy"}
 * 
 * const shrek2: Pelicula = {
 *   name: "shrek2",
 *   year: 2005,
 *   genre: "comedy"}
 * 
 * printMovie(shrek);
 * printMovie(shrek2);
 * 
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]

// Definimos un type para reconocer los posibles tipos y tipos secundarios
// de Bakemons posibles.

type bType = "NORMAL" | "FIRE" | "WATER" | "ELECTRIC" |
        "GRASS" | "ICE" | "FIGHTING" | "POISON" |
        "GROUND" | "FLYING" | "PSYCHIC" | "BUG" |
        "ROCK" | "GHOST" | "DRAGON" | "DARK" | "STEEL" | "FAIRY";

interface Bakemon {
  id: number,
  name: string,
  type: bType,
  secondary_type: undefined | bType,
  stats: {
    hp: number,
    atk: number,
    def: number,
    sp_atk: number,
    sp_def: number;
    speed: number;
  },
  moves: [
    {
      name: string,
      description: string,
      power: number,
      pp: number,
      priority: number;
    }
  ];
};



/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: bType): Array<Bakemon> {
  // Para esta función vamos a recorrer los bakemons recibidos y verificamos
  // si el tipo dado coincide con su tipo primario o secundario

  const filteredBakemon: Array<Bakemon> = [];

  bakemons.forEach((b) => {
    if (b.type === type || (b.secondary_type !== undefined && b.secondary_type === type)){
      filteredBakemon.push(b);
    }
  })

  return filteredBakemon;
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 */

function addBST(bakemons: Bakemon[]): Array<Bakemon & {bst: number}> {
  // Vamos a recorrer los bakemons, calcular el bst y crear
  // su nueva representación agregando ese atributo

  const newBakemons: Array<Bakemon & {bst: number}> = [];

  bakemons.forEach((b) => {
    let bst: number = 0;
    Object.values(b.stats).forEach((s) => {
      bst += s;
    })

    const newB: Bakemon & {bst: number} = {...b, bst};
    newBakemons.push(newB);
  })

  return newBakemons;
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 * 
 * Para esta función vamos a considerar el tipo extendido de Bakemon:
 * "Bakemon & {bst: number}", además del definido para reconocer los tipos posibles
 * de Bakemon (bType).
 * 
 * Con esto, el tipo de retorno será un diccionario con un tipo bType de llave, y el
 * respectivo Bakemon (de tipo Bakemon & {bst: number}) de bst más alto como valor. 
 * Esto porque permite asegurarse de que los tipos sean correctos, además de que solo se
 * pueda llamar sobre Bakemons que contengan el atributo bst.
 */

function findStrongestByType(bakemons: Bakemon[]): Map<bType, Bakemon & {bst: number}> {
  // Creamos el objeto que se diccionario que se retornará
  const strongestByType: Map<bType, Bakemon & {bst: number}> = new Map();

  // Calculamos el bst de los Bakemons dados
  const bakemonsBst: Array<Bakemon & {bst: number}> = addBST(bakemons);

  // Recorremos los Bakemons (con su bst), y por cada uno revisamos si su bst es mayor al
  // Bakemon de mismo tipo (o tipo secundario), para reemplazarlo si es necesario.
  bakemonsBst.forEach((b) =>{
    const strongestPrimary: Bakemon & {bst: number} | undefined = strongestByType.get(b.type);
    if (strongestPrimary === undefined){
      strongestByType.set(b.type, b);
    } else if (strongestPrimary.bst < b.bst){
      strongestByType.set(b.type, b);
    }

    // El procedimiento es el mismo, solo hay que asegurarse de que exista el tipo secundario
    // del Bakemon.

    if (b.secondary_type !== undefined){
      const strongestSecondary: Bakemon & {bst: number} | undefined = strongestByType.get(b.secondary_type);
      if (strongestSecondary === undefined){
        strongestByType.set(b.secondary_type, b);
      } else if (strongestSecondary.bst < b.bst){
        strongestByType.set(b.secondary_type, b);
      }
    }
  })

  // Luego se retorna el diccionario, que contiene el Bakemon de mayor bst para cada tipo posible
  // que estaba presente en la lista original. Si la lista no contenía Bakemons de cierto tipo, 
  // simplemente se omite como llave.
  return strongestByType;
}