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
            console.log('Editar lista')
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
        if(lista.indexOf(entrada) == -1 && entrada != "sair"){
            lista.push(`"${entrada}"`);
        }else if(entrada == 'sair' ){
            console.log('Encerrando lista ...')
        }
        else{
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
            message:'Deseja criar lista em arquivo?',

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
                console.log(chalk.bgRed.black('Está conta já existe!'),)
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
function EditarPropriedades(){
    console.log()
}
