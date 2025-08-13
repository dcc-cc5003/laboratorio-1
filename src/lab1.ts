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
  id: Number,
  name: string,
  type: string,
  secondary_type: string,
  stats: {
    hp: Number,
    atk: Number,
    def: Number,
    sp_atk: Number,
    sp_def: Number
  },
  moves: [
    {
      name: string,
      type: string,
      description: string,
      power: Number,
      pp: Number,
      priority: Number
    }
  ]
};

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: unknown): unknown {
  return
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 */

function addBST(bakemons: Bakemon[]): unknown {
  return
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 */

function findStrongestByType(
  bakemons: Bakemon[]
): unknown {
  return
}
