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
 * 
 * PEND
 *
 * -----------------------------
 * b)
 * 
 * PEND
 * -----------------------------
 * c)
 * 
 * PEND
 * -----------------------------
 */


/**
 * =============================
 *  PREGUNTA 2
 * =============================
 */

const data = require('../bakemons.json') as Bakemon[]

interface Bakemon {
  id: number,
  name: string,
  type: string,
  secondary_type: string | undefined,
  stats: {
    hp: number,
    atk: number,
    def: number,
    sp_atk: number,
    sp_def: number;
  },
  moves: [
    {
      name: string,
      type: string,
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

function filterByType(bakemons: Bakemon[], type: string): Array<Bakemon> {
  // Para esta función vamos a recorrer los bakemons recibidos y verificamos
  // si el tipo dado coincide con su tipo primario o secundario

  const filteredBakemon: Array<Bakemon> = [];

  bakemons.forEach((b) => {
    if (b.type === type.toUpperCase() || (b.secondary_type !== undefined && b.secondary_type === type.toUpperCase())){
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
 */

function findStrongestByType(bakemons: Bakemon[]): Map<string, Bakemon & {bst: number}> {

  const strongestByType: Map<string, Bakemon & {bst: number}> = new Map();
  const bakemonsBst: Array<Bakemon & {bst: number}> = addBST(bakemons);

  bakemonsBst.forEach((b) =>{
    const strongestPrimary: Bakemon & {bst: number} | undefined = strongestByType.get(b.type);
    if (strongestPrimary === undefined){
      strongestByType.set(b.type, b);
    } else if (strongestPrimary.bst < b.bst){
      strongestByType.set(b.type, b);
    }

    if (b.secondary_type !== undefined){
      const strongestSecondary: Bakemon & {bst: number} | undefined = strongestByType.get(b.secondary_type);
      if (strongestSecondary === undefined){
        strongestByType.set(b.secondary_type, b);
      } else if (strongestSecondary.bst < b.bst){
        strongestByType.set(b.secondary_type, b);
      }
    }
  })
  return strongestByType;
}