import fetch from 'node-fetch';

async function testRegister() {
  const res = await fetch('http://localhost:5173/api/register', { // substitui pela porta do Vite se diferente
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      companyName: 'Empresa Teste',
      cnpj: '00000000000191'
    })
  });

  const data = await res.json();
  console.log(data);
}

testRegister();
