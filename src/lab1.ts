/**
 * =============================
 *  PREGUNTA 1
 * =============================
 */

/**
 * a)
 * R: Que TypeScript sea de tipado estatico significa que las variables, parametros y retornos tienen tipos definidos y luego
 * verificados al momento de compilar, lo que se llama tiempo de compilacion. Esto permite detectar errores antes de ejecutar el programa y ofrece autocompletado e inferencia de tipos
 * en los editores de codigo.
 * 
 * Las ventjas frente al tipado dinamico pueden ser:
 * - Prevenir errores comunes de tipo en tiempo de compilacion.
 * - Autocompletado y sugerencias de tipos en los editores de codigo.
 * - Mayor claridad en el codigo, puesto que los tipos estan definidos explicitamente.
 * - Mejora la mantenibilidad del codigo, ya que los tipos ayudan a entender las relaciones entre diferentes partes del codigo.
 */ 

/**
 * b)
 * R: 
 * Por un lado any, se puede utilizar cuando no se desea que un valor en particular genere errores de verificación de tipos, basicamente se
 * desactiva la verificacion de tipos para ese valor, ademas se puede acceder a cada uno de sus campos que tambien se identificaran como any, se invocar
 * como funcion, asignar a un valor cualquiera, en resumen se puede hacer practicamente cualquier otra operacion que sintacticamente valida.
 * Por otro lado unkown, representa cualquier valor, pero a diferencia de any, no se puede acceder a sus propiedades o invocar como funcion sin antes hacer
 * una verificacion de tipo, por lo que se considera mas seguro, ya que obliga a realizar una comprobacion de tipo antes de operar con el valor.
 * 
 * En base a las diferencias del los programas en ese sentido any no tendria problemas de compilacion, ya que se puede acceder a sus propiedades y
 * realizar operaciones sin restricciones, mientras que con unkown se tendria que hacer una verificacion de tipo antes de acceder a sus propiedades o realizar operaciones, lo que
 * lo excluiria de todo error posterior. Por otro lado, al momento de correr el programa que usa any, tendria problemas con el linea printData(42), ya que se intenta acceder a una propiedad toUpperCase() que 
 * no existe en el tipo number.
 */

/**
 * c)
 * R: Que TypeScript compare tipos de forma estructural significa que no se basa en la identidad nominal de los tipos, sino en su estructura. Es decir,
 * dos tipos son considerados iguales si tienen la misma forma o estructura, independientemente de su nombre o declaración. Como por ejemplo:
 * 
 * Si tengo dos interfaces como las siguientes, ambas son consideradas del mismo tipo, Si bien no tienen el nombre, tiene la misma estructura y se pueden usar indistintamente.
 * 
 * interface Persona {
 *   nombre: string;
 *   edad: number;
 * }
 * inferface Animal {
 *  nombre: string;
 *  edad: number;
 * }
 */

/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]

type TypeBakemon = "NORMAL" | "FIRE" | "WATER" | "ELECTRIC" | "GRASS" | "ICE" |
 "FIGHTING" | "POISON" | "GROUND" | "FLYING" | "PSYCHIC" | "BUG" | "ROCK" | "GHOST" | "DRAGON" | "DARK" |
"STEEL" | "FAIRY"

type StastBakemon = {
  hp : number,
  atk : number,
  def: number,
  sp_atk : number,
  sp_def: number,
  speed : number,
}

type movesBakemon = {
  name : string,
  description : string,
  power : number,
  pp : number,
  priority : number,
}

interface Bakemon {
  id : number,
  name : string,
  type : TypeBakemon,
  secondary_type? : TypeBakemon,
  stats : StastBakemon,
  moves : movesBakemon[]
};

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: unknown): unknown {

  let filterBakemons: Bakemon[] = [];
  if( typeof type === 'string'){
    filterBakemons = bakemons.filter(bakemons => {
      return bakemons.type === type || bakemons.secondary_type === type;
    });
  }

  return filterBakemons;
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 * 
 * R: No entiendo muy a que se refiere con tipos faltantes, pero si se refiere a que la funcion addBST retorna un unkown, 
 * es porque no se especifica un tipo de retorno concreto. Esto puede ser util en algunos casos, pero en este caso
 * no es necesario, ya que la funcion retorna un arreglo de objetos Bakemon con una propiedad bst agregada.
 */

function addBST(bakemons: Bakemon[]): unknown {

  const bakemonsWithBST = bakemons.map(bakemon => {
    const sumBST = Object.values(bakemon.stats).reduce((acc, stat) =>  acc + stat, 0);
    return {
      ...bakemon,
      bst: sumBST,
    }
  });

  return bakemonsWithBST;
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 * 
 * R: El tipo de retorno de la funcion de findStrongestByType es una arreglo de objetos que el tipo y el bakemon mas fuerte de ese tipo.
 * Esto es asi porque la funcion busca el bakemon con el mayor BST (Base Stat Total) para cada tipo de bakemon y devuelve un arregl, que es el
 * objeto mas optimo para representar la relacion entre el tipo de bakemon y el bakemon mas fuerte de ese tipo.
 */

function findStrongestByType( bakemons: Bakemon[]): { Type: TypeBakemon; BakemonStrongest: Bakemon }[] {

  type Entry = { bakemon: Bakemon; bst: number };
  const strongestByType: Partial<Record<TypeBakemon, Entry>> = {};

  const sumBST = (b: Bakemon) => Object.values(b.stats).reduce((acc, n) => acc + n, 0);

  const theBest = (type: TypeBakemon, bakemon: Bakemon, bst: number) => {
    const current = strongestByType[type];
    if (!current || bst > current.bst) {
      strongestByType[type] = { bakemon: bakemon, bst };
    }
  };

  bakemons.forEach(bakemon => {
    const bst = sumBST(bakemon);
    theBest(bakemon.type, bakemon, bst);
    if (bakemon.secondary_type) theBest(bakemon.secondary_type, bakemon, bst);
  });


  const result =  Object.entries(strongestByType).map(([type, entry]) => ({
    Type: type as TypeBakemon,
    BakemonStrongest: (entry as Entry).bakemon
  }));

  return result;
}

