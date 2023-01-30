import chalk from 'chalk'
import inquirer from "inquirer"
import prompt from "prompt-sync"
import fs from 'fs'

ProgMain()

function ProgMain(){
    inquirer
    .prompt([
            {
                type:'list',
                name:'escolher',
                message:'O que voce deseja fazer?',
                choices:[
                    'Criar Lista',
                    'Editar Lista',
                    'Ver Dados',
                    'Sair'
                ],
            },
    ])
    .then((anwer) => {
        const escolher = anwer['escolher']

        if (escolher === 'Criar Lista'){
            Listapropriedades()
        }else if (escolher === 'Editar Lista'){
            EditarPropriedades()
        }else if(escolher === 'Ver Dados'){
            Visualizardados()
        }else if  (escolher === 'Sair'){
            console.log(chalk.bgGreen.underline.blackBright('Obrigado Por nos escolher ,Tenha um bom dia'))
            process.exit()
        }
    })
}

const command = prompt()

const Listapropriedades = (entrada) => {
    let lista = []
    while (entrada != "sair") {
        entrada = command("Insira uma propriedade CSS:")
        if(lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair'){
            lista.push(`"${entrada}"`);
        }else if(entrada == 'sair' ){
            console.log('Encerrando lista ...')
        }
        else if(lista.indexOf(`"${entrada}"`) != -1){
            console.log('Regra já adicionada')
        }
    }
    let result= lista.sort().join("\n")
    console.log(result)
    CriarArquivo(lista)    
}

function CriarArquivo(lista){
    console.log(lista)
    inquirer.prompt([
        {
            name:'lis',
            message:'Deseja criar nova lista em arquivo?',

        },
    ])
    .then((answer) => {
        if(answer.lis == 'sim'){
            console.info(answer['lis'])
            
            const listacriada = 'novalista'

            if(!fs.existsSync('plista')){
                fs.mkdirSync('plista')
            }
            if(fs.existsSync(`plista/${listacriada}.json`)){
                console.log(chalk.bgCyan.black('Nova Lista Criada!'),)
            }
            fs.writeFileSync(`plista/${listacriada}.json`,`{"list":[${lista}]}`,
            function (err){
                console.log(err)
            },)
            console.log(chalk.green('Arquivo Criado!'))
            ProgMain()
        }else{
            console.log('Encerrando a lista ...')
        }
    })
}
function EditarPropriedades(entrada){
    inquirer
    .prompt([
        {
            name:'listaatual',
            message:'Nome do arquivo que possui os itens?'

        },
    ])
    .then((answer) => {
        const listaedit =answer['listaatual']
        const listaed = Puxalista(listaedit)
        
        let listavelha = listaed.list
        let lista = []
        for (let cot=0; cot<listavelha.length;cot++){
            lista.push(`"${listavelha[cot]}"`)
        }
        inquirer
        .prompt([
            {
                type:'list',
                name:'escolheritens',
                message:'O que voce deseja fazer?',
                choices:[
                    'Adicionar na Lista',
                    'Remover da Lista'
                ],
            },
        ])
        .then((anwer) => {
            const escolheritens = anwer['escolheritens']

            if (escolheritens === 'Adicionar na Lista'){
                while (entrada != "sair") {
                    entrada = command("Insira uma propriedade CSS:")
                    if(lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair'){
                        lista.push(`"${entrada}"`);
                    }else if(entrada == 'sair' ){
                        console.log('Encerrando lista ...')
                    }else if(lista.indexOf(`"${entrada}"`) != -1){
                        console.log('Regra já adicionada')
                    }
                }
                let result= lista.sort().join("\n")
                console.log(result)
                CriarArquivo(lista)
            }else if (escolheritens === 'Remover da Lista'){
                while (entrada != "sair") {
                    entrada = command("Insira uma propriedade CSS:")
                    if(lista.indexOf(`"${entrada}"`) == -1 && entrada != 'sair'){
                        console.log('Não existe esse elemento na lista')
                    }else if(entrada == 'sair' ){
                        console.log('Encerrando lista ...')
                    }else if(lista.indexOf(`"${entrada}"`) != -1){
                        lista.splice(lista.indexOf(`"${entrada}"`),1)
                        console.log(`A propriedade ${entrada} foi removida da lista`)
                    }
                }
                let result= lista.sort().join("\n")
                console.log(result)
                CriarArquivo(lista)
            }
        })
    })
}
function Puxalista(listaedit){
    const accountJSON = fs.readFileSync(`plista/${listaedit}.json`,{
        encoding:'utf-8',
        flag:'r',//quebra linha
    })
    return JSON.parse(accountJSON)
}
function Visualizardados(){
    inquirer
    .prompt([
        {
            name:'listaatual',
            message:'Nome do arquivo que possui os itens?'

        },
    ])
    .then((answer) => {
        const listaedit =answer['listaatual']
        const listaed = Puxalista(listaedit)
        
        let listavelha = listaed.list
        let lista = []
        for (let cot=0; cot<listavelha.length;cot++){
            lista.push(`"${listavelha[cot]}"`)
        }
        let result= lista.sort().join("\n")
        console.log(result)
    })
}