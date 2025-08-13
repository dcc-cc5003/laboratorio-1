/**
 * =============================
 *  PREGUNTA 1
 * =============================
 */
// a) Que TypeScript sea de tipado estático, significa que se hacen verificaciones de tipos y da los errores antes de ejecutar el programa. La principal ventaja es que hay menos errores de runtime, haciendo un código más robusto.
// b) Con any, no se verifica si hay errores de tipo, por lo que al hacer bypass al tipado estático, puede generar errores tales como en el caso 1, no se puede hacer toUpperCase a un num, por lo que se caerá en runtime.
// en cambio, el tipo unknown obliga a refinar el tipo primero, por lo que hay menos errores de tipo, en este caso, el segundo programa se cae en tiempo de compilación puesto que no se especifica qué tipo de unknown es, por lo que habría que hacer un if(typeof valorUnknow === "string")..., y lo mismo para num.
// c) Que compare tipos de forma estructural significa que, al comparar dos clases o tipos, no los compara por su nombre si no que por su estructura, esto quiere decir que:
// Si hay dos objetos, de distinto nombre, pero con los mismos campos, ej: billetera y un bolsillo, en que ambos guardan dinero y una divisa:
interface Bolsillo{
  dinero: number;
  divisa: string;
}
interface Billetera{
  dinero: number;
  divisa: string;
}
// Estas dos estructuras son compatibles, ya que tienen la misma forma, aunque no tengan el mismo nombre, por lo que se puede operar entre ambas.
function mostrarDinero(b: Billetera){
  console.log(`Hay ${b.dinero} ${b.divisa}`)
}
const miBolsillo: Bolsillo={
  dinero:10,
  divisa:"pesos",
}
mostrarDinero(miBolsillo)
// No se cae!
/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]

type BakemonType =
  |'NORMAL'|'FIRE'|'WATER'|'ELECTRIC'|'GRASS'|'ICE'|'FIGHTING'|'POISON'|'GROUND'|'FLYING'|'PSYCHIC'|'BUG'|'ROCK'|'GHOST'|'DRAGON'|'DARK'|'STEEL'|'FAIRY';

interface Bakemon {
  id: number,
  name: string,
  type: BakemonType,
  secondary_type?:BakemonType,
  stats:{
    hp:number,
    atk:number,
    def:number,
    sp_atk:number,
    sp_def:number,
  };
  moves:{
    name:string,
    type:BakemonType;
    powe:number,
  }[];
};

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: BakemonType): Bakemon[] {
  return bakemons.filter(b => b.type===type || b.secondary_type === type);
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 */

function addBST(bakemons: Bakemon[]): (Bakemon &{bst:number})[] {
  return bakemons.map(b=>({
    ...b,
    bst: b.stats.atk + b.stats.def+b.stats.hp+b.stats.sp_atk+b.stats.sp_def
  }));
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 */

function findStrongestByType(
  bakemons: Bakemon[]
): {[key in BakemonType]?: Bakemon & {bst:number}} {
  const BSTBakemons: (Bakemon & {bst:number})[]=addBST(bakemons);

  const strongestByType: {[key in BakemonType]?: Bakemon & {bst:number}}={};
  BSTBakemons.forEach(b=>{
    // Si el bst del pokemon tipo T es mayor al que está en strongestByType, o es el primero que ponemos, lo reemplazamos
    if (!strongestByType[b.type] || b.bst>strongestByType[b.type]!.bst){
      strongestByType[b.type]=b;
    }
    // Si hay un tipo secundario, verificamos lo mismo que el de arriba
    if(b.secondary_type){
      if(!strongestByType[b.secondary_type] || b.bst > strongestByType[b.secondary_type]!.bst){
        strongestByType[b.secondary_type] = b;
      }
    }
  });
  // Finalmente retornamos el objeto
  return strongestByType;
  
}
