

/**
 * =============================
 *  PREGUNTA 1
 * =============================

a) Significa que los las variables en Typescript tienen tipos que se conocen en tiempo de compilacion, es decir los tipos de datos de las variables se pueden inferir antes de ejecutar el programa. Las ventajas que esto tiene sobre un lenguaje con tipado dinamico es que se pueden captar errores por tipo antes de la ejecución del programa, hace que el codigo se mas mantenible y escalable y ademas hace mas legible el codigo.

b) La diferencia entre any y unknown es que el tipo any permite hacer cualquier operacion sobre el, es decir se puede hacer todas las operaciones que tienen los strings, los numeros, las funciones o cualquier otro tipo. El tipo unknown no permite esto, aunque el dato pueda ser de cualquier tipo. En el programa de ejemplo, en el caso de la funcion que utiliza any se arrojara un error en tiempo de ejecucion al intentar hacer 'data.toUpperCase()' cuando se hace printData(42). En el segundo caso, donde se usa unknown habra un error en compilacion ya que 'data' es de tipo unknown y no permite realizar la operacion 'toUpperCase()'.

c) Esto significa que Typescript no compara dos tipos por su nombre sino que los compara por sus caracteristicas o campos. Por ejemplo si tenemos un tipo:

type Point {
  x: number;
  y: number;
}

este seria compatible con

type Punto {
  x: number;
  y: number;
}

ya que solo se compara si los atributos del tipo son iguales y no es necesario que se llamen igual ambos tipos.
*/

/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]


type BakemonType =
| "NORMAL"
| "FIRE"
| "WATER"
| "ELECTRIC"
| "GRASS"
| "ICE"
| "FIGHTING"
| "POISON"
| "GROUND"
| "FLYING"
| "PSYCHIC"
| "BUG"
| "ROCK"
| "GHOST"
| "DRAGON"
| "DARK"
| "STEEL"

interface Stats {
  hp: number;
  atk: number;
  def: number;
  speed: number;
  sp_atk: number;
  sp_def: number;

}

interface Move {
  name: string;
  type: BakemonType;
  power: number;

}
interface Bakemon {
  id: number;
  name: string;
  type: BakemonType;
  secondary_type?: BakemonType;
  stats: Stats;
  moves: Move[];
  // ...
};

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

function addBST(bakemons: Bakemon[]): (Bakemon & { BST: number })[] {
  return bakemons.map(b => {
    const BST = b.stats.atk + b.stats.def + b.stats.hp + b.stats.sp_atk + b.stats.sp_def + b.stats.speed;
    return {...b, BST};
  })
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 */

function findStrongestByType(bakemons: Bakemon[]): Record<BakemonType, (Bakemon & { BST: number }) | null> {
  const BakemonsBST = addBST(bakemons);

  const strongest = {} as Record<BakemonType, (Bakemon & { BST: number }) | null>;

  const types: BakemonType[] = [
    "NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE",
    "FIGHTING", "POISON", "GROUND", "FLYING", "PSYCHIC",
    "BUG", "ROCK", "GHOST", "DRAGON", "DARK", "STEEL"
  ];

  for (const t of types) {
    const filtered = filterByType(BakemonsBST, t) as (Bakemon & { BST: number })[];

    if (filtered.length > 0) {
      const best = filtered.reduce((max, b) => (b.BST > max.BST ? b : max));
      strongest[t] = best;
    } else {
      strongest[t] = null;
    }
  }
  return strongest;
}
console.log(filterByType(data, "FIRE"));
