import abrir from './abrir';

let dbAsync = null;

const iniciar = async() => {
  await criarTabelas();
  let listaPessoas = await listarPessoas();
  
  console.log(`Registros de Pessoas encontradas: ${listaPessoas.length}`);
  console.log(listaPessoas);
   
  console.log("Tabelas criadas")
  if(listaPessoas.length === 0){
    await cadastrarPessoa({nome: "Poatan", idade: 17});
    console.log("Pessoa cadastrada")
    await cadastrarPessoa({nome: "Jones", idade: 99})
    console.log("Pessoa cadastrada")
 
    listaPessoas = await listarPessoas();
    console.log(`Registros encontrados: ${listaPessoas.length}`);
    console.log(listaPessoas);
  }
}

const conectar = async () => {
  if(dbAsync === null) {
    dbAsync = abrir();
  }
  return await dbAsync;
}

const criarTabelas = async() => {
  dbAsync = await conectar();
  await dbAsync.execAsync(`
    CREATE TABLE IF NOT EXISTS tb_Pessoa(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(50),
      profissao TEXT,
      email TEXT,
      idade SMALLINT
    )
  `);
  
  
}

// Funções para tb_Pessoa
const cadastrarPessoa = async (pessoa) => {
  dbAsync = await conectar();
  await dbAsync.runAsync(
    'INSERT INTO tb_Pessoa(nome, profissao, email, idade) VALUES(?, ?, ? , ?)',
    [ pessoa.nome,
      pessoa.profissao,
      pessoa.email, 
      pessoa.idade ]
  );
}

const atualizarPessoa = async (pessoa) => {
  dbAsync = await conectar();
  const result = await dbAsync.runAsync(
    `UPDATE tb_Pessoa SET
      nome = ?,
      profissao = ?,
      email = ?,
      idade = ?
    WHERE id = ?`,
    [pessoa.nome, pessoa.profissao, pessoa.email, pessoa.idade, pessoa.id]
  );
  
  console.log("Resultado da atualização no atualizarPessoa:", result); // Log para verificar

  // Usar 'changes' em vez de 'rowsAffected'
  return result.changes > 0; // Retorna true se uma linha foi afetada
};



const excluirPessoa = async (id) => {
  dbAsync = await conectar();
  await dbAsync.runAsync(
    'DELETE FROM tb_Pessoa WHERE id = ?',
    [id]
  );
}

const consultarPessoa = async (id) => {
  dbAsync = await conectar();
  const pessoa = await dbAsync.getFirstAsync(
    'SELECT * FROM tb_Pessoa WHERE id = ?',
    [id]
  );
  return pessoa;
}

const filtrarPessoas = async (nome) => {
  dbAsync = await conectar();
  const lista = await dbAsync.getAllAsync(
    'SELECT * FROM tb_Pessoa WHERE nome LIKE ?',
    [`%${nome}%`]
  );
  return lista;
}

const listarPessoas = async() => {
  dbAsync = await conectar();
  const lista = await dbAsync.getAllAsync(
    'SELECT * FROM tb_Pessoa'
  );
  return lista;
}

export {
  criarTabelas,
  // Exports para Pessoa
  cadastrarPessoa,
  atualizarPessoa,
  excluirPessoa,
  consultarPessoa,
  filtrarPessoas,
  listarPessoas,
  iniciar
};
