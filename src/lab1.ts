/**
 * =============================
 *  PREGUNTA 1
 * =============================
 */

/**
 * a) El tipado estático significa que Typescript identifica errores sin ejecutar el código, analizando los tipos de datos utilizados
 * en tiempo de compilación (y no de ejecución). Las ventajas sobre el tipado dinámico vendrían a ser la detección temprana de errores
 * (como usar un objeto con una estructura incorrecta) mediante esta verificación previa de tipos, logrando un refactoring más seguro.
 * 
 * b) En el caso de la primera funcion Typescript no verifica si toUpperCase() existe por lo tanto en ejecución al intentar hacer
 * 42.toUpperCase() (para printData(42), el otro print funciona correctamente) va a existir un error en runtime ya que habrá un error
 * de tipos, ya que data.toUpperCase no es funcion para 42 (solo existe en strings), pero como data es any, se esta desactivando 
 * completamente la verificación de tipos y es por esto que ocurre el error. Es decir con any no existen errores en compilación, 
 * pero si en ejecución.
 * 
 * En el caso 2, con Unknown, habrá un error de compilación para ambos prints, ya que object es de tipo 'unknown' y no existe
 * verificación del método, por lo tanto no llega a ejecutar en ninguno de los casos. Es así como Unknown te obliga a verificar los
 * tipos antes de usarlos, presentándose como una alternativa más segura que any.+
 * 
 * c) La comparación de tipos de forma estrucutral significa que dos tipos son compatibles si tienen la misma estrucutra 
 * (propiedades y métodos), independientemente de sus nombres. Un ejemplo: 
 * 
 * interface Animal {
 *    name: string;
 * }
 * 
 * interface Dog {
 *    name: string;
 * }
 * 
 * let animal: Animal = {name: "Akira"};
 * let dog: Dog = animal; Lo que es válido, ya que poseen la misma estructura.
 * 
 */


/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]

interface Bakemon {
  id: number;
  name: string;
  type: string;
  secondary_type?: string;
  stats: {
    hp: number;
    atk: number;
    def: number; 
    sp_atk: number;
    sp_def: number;
    speed: number;
  };
  moves: {
    name: string;
    description: string;
    power: number | null;
    pp: number;
    priority: number;
  }[];
}

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: unknown): Bakemon[] {
  const filter: Bakemon[] = []; //Array que filtra los tipos
  for (const bak of bakemons) {
    if (bak.type == type) {
      filter.push(bak); //Si coincide con el tipo primario, agregamos.
    }
    else if (bak.secondary_type == type) {
      filter.push(bak); //Si coincide con el tipo secundario, agregamos.
    }
  }
  return filter
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 * 
 * La eleccion de retorno corresponde a la interseccion entre Bakemon y bst y fue escogida puesto de esta manera
 * se realiza el retorno de cada Bakemon con todas sus propiedades + su bst, evitando el uso de any y permitiendonos
 * extender el tipo en la linea 103. 
 * 
 */

function addBST(bakemons: Bakemon[]): (Bakemon & {bst: number})[] { //El retorno mantiene todas las propiedades de los Bakemon + el bst
  for(const bak of bakemons) {
    const stats = bak.stats
    const bst = stats.hp + stats.atk + stats.def + stats.sp_atk + stats.sp_def + stats.speed;
    (bak as Bakemon & {bst: number}).bst = bst; //Hacemos un type assertion.
  }
  return bakemons as (Bakemon & {bst:number})[]; //Retornamos una interseccion entre los Bakemon y su bst.
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 * 
 * La elección de retorno corresponde a un Record donde cada llave es un tipo (string) y el valor es un
 * Bakemon con su BST, se realizo así ya que esto es lo que mejor calza con lo que se pide en el enunciado.
 * 
 */

function findStrongestByType(bakemons: Bakemon[]): Record<string, Bakemon & {bst: number}> {
  const withBST = addBST(bakemons); //Se añade el BST a los bakemons mediante la función de la pregunta 4.
  const types = ["NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE","FIGHTING", "POISON", "GROUND", 
                  "FLYING", "PSYCHIC", "BUG", "ROCK","GHOST", "DRAGON", "DARK", "STEEL", "FAIRY"];
  const result: Record<string, Bakemon & {bst: number}> = {};
  for (const type of types) {
    const bakByType = filterByType(withBST, type) as (Bakemon & {bst: number})[]; //Se filtra por tipos.
    if (bakByType.length > 0) { //Se recorre el array del tipo.
      let strongest = bakByType[0];
      for (const bak of bakByType) { //Se hace la comparación
        if (bak.bst > strongest.bst) {
          strongest = bak;
        }
      }
      result[type] = strongest; //Asignamos al más fuerte directamente.
    }
  }
  return result;
}
