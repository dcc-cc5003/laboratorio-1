/**
 * =============================
 *  PREGUNTA 1
 * =============================
 */

/**
 * a) Que signficia que Ts sea de tipado estatico? ¿Que ventajas tiene 
 * sobre tipado dinamico? 
 * 
 * El tipado estático permite capturar errores de tipo en tiempo de compilacion, lo que facilita
 * la deteccion temprana de errores. 
 * Las ventajas del tipado estático sobre el dinámico incluyen:
 * - Mayor seguridad en el código, ya que los errores de tipo se detectan antes de la ejecución.
 * - Mejora en la legibilidad y mantenibilidad del código, al hacer explícitos los tipos de datos.
 * - Posibilidad de optimizaciones en tiempo de compilación, lo que puede resultar en un mejor rendimiento. (no es una garantia!)
 */


/** b) Cual es la diferencia entre los tipos any y unknown. Explique las dif. en base a estos programas.
PROGRAMA 1 
function printData(data: any){
 console.log(data.toUpperCase());
}
printData("hola");
printData(42);

PROGRAMA 2
function printData(data: unknown){
 console.log(data.toUpperCase());
}
printData("hola");
printData(42);



any: desactiva el chequeo de tipos, se puede
hacer cualquier operación y el compilador no reclama
(pero es inseguro obviamente)

unknown: es un any mas seguro por asi decirlo, 
a un valor unknown se le puede asignar cualquier valor, 
pero no se puede acceder a sus propiedades, llamarlo, etc hasta refinar 
el tipo (type-narrowing) o afirmar (cast).




Es mas, en el programa 1 se cae en runtime, mientras que

el programa 2 porque como dijimos se cae en compilacion porque se necesita refinar el tipo 
para llamarlo

Este es el error

src/index.ts:2:14 - error TS18046: 'data' is of type 'unknown'.

2  console.log(data.toUpperCase());
               ~~~~


Found 1 error in src/index.ts:2,

mientras que el error del programa 1 es 

> ts-any-demo@1.0.0 start
> npm run build && node dist/index.js


> ts-any-demo@1.0.0 build
> tsc -p .

HOLA
/Users/pabloignaciobenario/playground/node/ts-any-demo/dist/index.js:3
    console.log(data.toUpperCase());
                     ^

TypeError: data.toUpperCase is not a function
    at printData (/Users/pabloignaciobenario/playground/node/ts-any-demo/dist/index.js:3:22)
    .....


*/


/**
 * c) Se refiere a que dos tipos son compatibles si su forma
 * (propiedades y metodos) coincide, y no por el nombre ni por 
 *  "de donde viene" el tipo. 
 * 
 * 1) ejemplo de mismo "shape" -> compatibles.
 * 
 * type Persona = { nombre: string; edad: number };
 * type Usuario = { nombre: string; edad: number };
 *
 * const p: Persona = { nombre: "Ana", edad: 20 };
 * const u: Usuario = p;  // OK: misma estructura

2) Objeto con propiedades extra -> compatible si al menos cumple el shape esperado
type Punto = { x: number; y: number };

const p3 = { x: 1, y: 2, z: 3 };
const q: Punto = p3;               // OK: tiene x e y

// SIN EMBARGO los literales tienen chequeo estricto
const r: Punto = { x: 1, y: 2, z: 3 }; // Error: 'z' no existe en 'Punto'

3) Tipos con métodos: basta con cumplir los requeridos
type Dibujable = { draw(): void };
type Circulo = { draw(): void; radius: number };

const c: Circulo = { draw(){}, radius: 10 };
const d: Dibujable = c;  // OK: Circulo “encaja” en Dibujable

 * 
 */

/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[];

const BAKEMON_TYPES = [
  "NORMAL","FIRE","WATER","ELECTRIC","GRASS","ICE","FIGHTING","POISON",
  "GROUND","FLYING","PSYCHIC","BUG","ROCK","GHOST","DRAGON","DARK",
  "STEEL","FAIRY",
] as const;

type BakemonType = typeof BAKEMON_TYPES[number];

interface Stats {
  hp: number;
  atk: number;
  def: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

interface Move {
  name: string;
  description: string;
  power: number | null; // en el  JSON a veces es null
  pp: number;
  priority: number;
}


interface Bakemon {
  id: number;
  name: string;
  type: BakemonType;                // todos tienen tipo
  secondary_type?: BakemonType;     // no todos tienen tipo secundario 
  stats: Stats;
  moves: Move[];
}

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: BakemonType): Bakemon[] {
  return bakemons.filter(b => b.type === type || b.secondary_type === type);
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 */


// este tipo nos permite indicar withbst son los bakemon de siempre pero agregandole
// el campo bst!
type WithBST = Bakemon & { bst: number };


function addBST(bakemons: Bakemon[]): WithBST[] {
  for (const b of bakemons as WithBST[]) {
    b.bst =
      b.stats.hp +
      b.stats.atk +
      b.stats.def +
      b.stats.sp_atk +
      b.stats.sp_def +
      b.stats.speed;
  }
  return bakemons as WithBST[];
}


/**
 * =============================
 *  PREGUNTA 5
 * =============================
 */

function findStrongestByType(
  bakemons: Bakemon[]
): Partial<Record<BakemonType, WithBST>> {
  const enriched: WithBST[] = addBST(bakemons);
  const res: Partial<Record<BakemonType, WithBST>> = {};

  for (const b of enriched) {
    const candidates = [b.type, b.secondary_type].filter(
      (t): t is BakemonType => !!t
    );
    for (const t of candidates) {
      const curr = res[t];
      if (!curr || b.bst > curr.bst) res[t] = b;
    }
  }
  return res;
}

/**
 * 
Por que elegi ese tipo de retorno...
Partial<Record<BakemonType, WithBST>>: modela precisamente un diccionario “TIPO -> Bakemon ganador con bst”.
Partial porque puede que no haya Bakemon de algún tipo en los datos.
WithBST para exponer el bst ya calculado (evitas recomputar al mostrar/ordenar).
 */
