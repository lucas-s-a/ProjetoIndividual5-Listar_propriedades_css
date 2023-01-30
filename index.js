import chalk from 'chalk'
import inquirer from "inquirer"
import prompt from "prompt-sync"
import fs from 'fs'

ProgMain()

function ProgMain() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'escolher',
                message: 'O que voce deseja fazer?',
                choices: [
                    'Criar Lista Nova',
                    'Editar Lista',
                    'Ver Dados Da lista',
                    'Sair'
                ],
            },
        ])
        .then((anwer) => {
            const escolher = anwer['escolher']

            if (escolher === 'Criar Lista Nova') {
                Listapropriedades()
            } else if (escolher === 'Editar Lista') {
                EditarPropriedades()
            } else if (escolher === 'Ver Dados Da lista') {
                Visualizardados()
            } else if (escolher === 'Sair') {
                console.log(chalk.bgGreen.blackBright('Obrigado Por nos escolher ,Tenha um bom dia'))
                process.exit()
            }
        })
}

const command = prompt()

const Listapropriedades = (entrada) => {
    let lista = []
    while (entrada != "sair") {
        entrada = command("Insira uma propriedade CSS ou 'sair' para Encerrar:").toLocaleLowerCase()
        if (lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair') {
            lista.push(`"${entrada}"`);
        } else if (entrada == 'sair') {
            console.log(chalk.bgGrey('Encerrando lista ...'))
        }
        else if (lista.indexOf(`"${entrada}"`) != -1) {
            console.log(chalk.yellow('Regra já adicionada na lista'))
        }
    }
    let result = lista.sort().join("\n")
    console.log(chalk.bgCyanBright.black(result))
    CriarArquivo(lista)
}

function CriarArquivo(lista) {
    inquirer.prompt([
        {
            name: 'lis',
            message: 'Deseja criar nova lista em arquivo?',

        },
    ])
        .then((answer) => {
            let ajuste = answer.lis.toLocaleLowerCase()
            if (ajuste == 'sim') {
                const listacriada = 'listacss'

                if (!fs.existsSync('plista')) {
                    fs.mkdirSync('plista')
                }
                if (fs.existsSync(`plista/${listacriada}.json`)) {
                    console.log(chalk.bgCyan.black('Nova Lista Criada!'),)
                }
                fs.writeFileSync(`plista/${listacriada}.json`, `{"list":[${lista}]}`,
                    function (err) {
                        console.log(err)
                    },)
                console.log(chalk.green('Arquivo Criado! Nome do arquivo(listacss)'))
                ProgMain()
            } else if (ajuste == 'nao' || ajuste == 'não') {
                console.log(chalk.bgYellow.black('Ok! Retornando a página inicial'))
                ProgMain()
            } else {
                console.log(chalk.red('Comando inválido Retornando a página inicial!'))
                ProgMain()
            }
        })
}
function EditarPropriedades(entrada) {
    inquirer
        .prompt([
            {
                name: 'listaatual',
                message: 'Digite "listacss" para acessar:'

            },
        ])
        //começa aqui
        .then((answer) => {
            try {
                const listaedit = answer['listaatual']
                const listaed = Puxalista(listaedit)

                let listavelha = listaed.list
                let lista = []
                for (let cot = 0; cot < listavelha.length; cot++) {
                    lista.push(`"${listavelha[cot]}"`)
                }
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'escolheritens',
                            message: 'O que voce deseja fazer?',
                            choices: [
                                'Adicionar na Lista',
                                'Remover da Lista'
                            ],
                        },
                    ])
                    .then((anwer) => {
                        const escolheritens = anwer['escolheritens']

                        if (escolheritens === 'Adicionar na Lista') {
                            while (entrada != "sair") {
                                entrada = command("Insira uma propriedade CSS ou 'sair' para Encerrar:").toLocaleLowerCase()
                                if (lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair') {
                                    lista.push(`"${entrada}"`);
                                } else if (entrada == 'sair') {
                                    console.log(chalk.yellow('Finalizando ...'))
                                } else if (lista.indexOf(`"${entrada}"`) != -1) {
                                    console.log(chalk.bgYellowBright.black('Regra já adicionada'))
                                }
                            }
                            let result = lista.sort().join("\n")
                            console.log(chalk.bgCyanBright.black(result))
                            CriarArquivo(lista)
                        } else if (escolheritens === 'Remover da Lista') {
                            while (entrada != "sair") {
                                entrada = command("Insira uma propriedade CSS ou 'sair' para Encerrar:").toLocaleLowerCase()
                                if (lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair') {
                                    console.log(chalk.bgYellow.black('Não existe esse elemento na lista'))
                                } else if (entrada == 'sair') {
                                    console.log(chalk.yellow('Finalizando ...'))
                                } else if (lista.indexOf(`"${entrada}"`) != -1) {
                                    lista.splice(lista.indexOf(`"${entrada}"`), 1)
                                    console.log(chalk.bgGreenBright.black(`A propriedade ${entrada} foi removida da lista`))
                                }
                            }
                            let result = lista.sort().join("\n")
                            console.log(chalk.bgCyanBright.black(result))
                            CriarArquivo(lista)
                        }
                    })
            } catch {
                console.log(chalk.bgRedBright.black(`Arquivo não encontrado ou dado inserido inválido! Retornando a página inicial`))
                ProgMain()
            }
        })
}
function Puxalista(listaedit) {
    const accountJSON = fs.readFileSync(`plista/${listaedit}.json`, {
        encoding: 'utf-8',
        flag: 'r',//quebra linha
    })
    return JSON.parse(accountJSON)
}
function Visualizardados() {
    inquirer
        .prompt([
            {
                name: 'listaatual',
                message: 'Digite "listacss" para acessar:?'

            },
        ])
        .then((answer) => {
            try{
                const listaedit = answer['listaatual']
                const listaed = Puxalista(listaedit)

                let listavelha = listaed.list
                let lista = []
                for (let cot = 0; cot < listavelha.length; cot++) {
                    lista.push(`"${listavelha[cot]}"`)
                }
                let result = lista.sort().join("\n")
                console.log(chalk.bgBlue.yellow("Lista com Propriedades CSS:"))
                console.log(chalk.bgCyanBright.black(result))
                ProgMain()
            }catch{
                console.log(chalk.bgRedBright(`Arquivo não encontrado ou dado inserido inválido,Voltando a página inicial`))
                ProgMain()
            }
        })
}