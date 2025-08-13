/**
 * =============================
 *  PREGUNTA 1
 * =============================
 * A. Significa que en tiempo de compilación se hace una revisión para comprobar que 
 * los tipos son coherentes y usen propiedades propias o de las clases superiores.
 * 
 * B. Los tipos unknown no permiten llamar a propiedades que no existan, es decir, en tiempo 
 * de compilación se conmprueba que efectivmnte tengan el método o atributo llamado.
 * En estos programas en el caso de any compilaría pero tiraría error al ejecutar la linea
 * printData(42). Por otro lado el programa de unknown se caería en compilación.
 * 
 * C. Significa que compara y chequea tipos considerando su estructura, no sus nombres.
 * Es gracias a eso que puede ser capaz de ayudar al programador sugiriendo el tipo que debería
 * estar usando. Un ejemplo seria digmaos que el dev llama a una funcion drawSquare(s : Square) => void
 * 
 * draw({side: 20}); // Funciona
 * draw({sdie: 1}); // El programa sugiere "Object literal may only specify known properties, but 
 * 'sdie'  does not exist in type 'Square'. Did you mean to write 'side'?"
 */


/**
 * =============================
 *  PREGUNTA 2
 * =============================
 * 
 * 
 */

const data = require('../bakemons.json') as Bakemon[]

interface Bakemon {
  id: number;
  name: string;
  type: string;
  secondary_type: string | null;
  stats: {
    hp: number;
    atk: number;
    def: number;
    sp_atk: number;
    sp_def: number;
  },
  moves: [
    {
      name: string;
      type: string;
      power: number
    },
 ],

};

/**
 * =============================
 *  PREGUNTA 3
 * =============================
 */

function filterByType(bakemons: Bakemon[], type: string): Bakemon[] {
  return bakemons.filter((b) => b.type == type || b.secondary_type == type);
}

/**
 * =============================
 *  PREGUNTA 4
 * =============================
 */

interface Bakemon {
  bst: number;
}

function addBST(bakemons: Bakemon[]): Bakemon[] {
  return bakemons.map((b) => {
    const stats = b.stats;
    const bst = stats.hp + stats.atk + stats.def + stats.sp_atk + stats.sp_def;
    b.bst = bst;
    return b;
  })
}

/**
 * =============================
 *  PREGUNTA 5
 * =============================
 */


function findStrongestByType(
  bakemons: Bakemon[]
): {type: string, bakemon: Bakemon}[] {
  let types: Map<string, Bakemon> = new Map;
  bakemons.forEach(
    (b) => {
      if (types.has(b.type)) {
        const otherBakemon = types.get(b.type);
        if (otherBakemon!.bst < b.bst) {
          types.set(b.type, b);
        }
      } else types.set(b.type, b);
    }

  );
  let sol : {type: string, bakemon: Bakemon}[] = [];

  for (let [t, b] of types) {
    sol.push({type: t, bakemon: b});
  }

  return sol;
}
