class Testes {
    testeExisteChave(obj, chave, caminho = "obj") {
        // Verifica se a chave está no nível atual do objeto
        if (obj.hasOwnProperty(chave)) {
            return `${caminho}.${chave}`;
        }

        // Percorre as propriedades do objeto
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Chama a função recursivamente para verificar objetos aninhados
                const resultado = this.testeExisteChave(obj[key], chave, `${caminho}.${key}`);
                if (resultado) {
                    return resultado;
                }
            }
        }

        // Retorna null se a chave não for encontrada
        return null;
    }

    validaDataDDMMYYYY(data) {

        const regexPadrao = /^\d{2}\/\d{2}\/\d{4}$/; // Padrão dd/mm/yyyy

        const isDataValida = regexPadrao.test(data);

        return isDataValida ? "Formato válido" : "Formato inválido";

    }

    validaDataISO(data) {

        const regexPadrao = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // Padrão ISO 8601

        const isDataValida = regexPadrao.test(data);

        return isDataValida ? "Formato válido" : "Formato inválido";

    }


    verificarDuplicatasCodigoContrato(obj) {
        const contratos = obj.dadosCompra.contratos;
        const codigos = new Set();

        for (let contrato of contratos) {
            if (codigos.has(contrato.codigoContrato)) {
                return false; // Se o código já existir no Set, há duplicata
            }
            codigos.add(contrato.codigoContrato); // Adiciona o código ao Set
        }

        return true; // Se não encontrar duplicatas, retorna true
    }
}

// Exemplo de uso
const instancia = new Testes();

const exemploObjeto = {
    dadosPessoais: {
        nome: "João",
        dataNascimento_mensagem: "20/07/1998",
        dataNascimento_calculo: "1998-07-20T00:00:00Z",
        cpf_cliente: "304.370.720-61",
        endereco: {
            cidade: "São Paulo",
            estado: {
                nome: "São Paulo",
                sigla: "SP"
            }
        }
    },
    dadosCompra: {
        qntContratos: 3,
        contratos: [
            {
                codigoContrato: "2361236",
                qntFaturas: 2,
                faturas: [{
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                },
                {
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                }]
            },
            {
                codigoContrato: "2361238",
                qntFaturas: 2,
                faturas: [{
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                },
                {
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                }]
            }, {
                codigoContrato: "2361237",
                qntFaturas: 2,
                faturas: [{
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                },
                {
                    codigo: "442",
                    valor: "R$ 46,00",
                    dataPagamentoMensagem: "20/07/1998",
                    dataPagamentoCalculo: "1998-07-20T00:00:00Z"
                }]
            }
        ]
    }


};

//========= VALIDA CHAVE EXISTENTE NO OBJETO ============
console.log('=== VALIDA CHAVE EXISTENTE NO OBJETO ===');
const chaveParaVerificar1 = "sigla";  // Está numa camada mais profunda
const chaveParaVerificar2 = "pais";   // Não existe no objeto

console.log(instancia.testeExisteChave(exemploObjeto, chaveParaVerificar1)); // obj.endereco.estado.sigla
console.log(instancia.testeExisteChave(exemploObjeto, chaveParaVerificar2)); // null

//========== VALIDA DATA ===============
console.log('========== VALIDA DATA =============');
const dataNascimento_mensagem = instancia.validaDataDDMMYYYY(exemploObjeto.dadosPessoais.dataNascimento_mensagem);
console.log("dataNascimento_mensagem: ", dataNascimento_mensagem);

const dataNascimento_calculo = instancia.validaDataISO(exemploObjeto.dadosPessoais.dataNascimento_calculo);
console.log("dataNascimento_calculo: ", dataNascimento_calculo);

//========== VALIDA CODIGO CONTRATO DUPLICADO =============
console.log('=== VALIDA CODIGO CONTRATO DUPLICADO ===');
const resultadoDuplicatas = instancia.verificarDuplicatasCodigoContrato(exemploObjeto);
console.log(resultadoDuplicatas); // false (duplicata encontrada)