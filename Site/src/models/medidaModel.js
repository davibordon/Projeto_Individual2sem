var database = require("../database/config");

function buscarUltimasMedidasCpu(serialNumber, limite_linhas) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'cpu'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'cpu'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasOciosidade(serialNumber, limite_linhas) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} usoUsuario, usoOcioso,
        FORMAT(datahora,'%H:%m:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select usoUsuario, usoOcioso,
        DATE_FORMAT(datahora,'%H:%i:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRam(serialNumber, limite_linhas) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT top ${limite_linhas}
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'cpu'
                    ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico
                    FROM vwConsumo
                    WHERE NumeroSerial = '${serialNumber}' AND Componente = 'ram'
                    ORDER BY ID DESC LIMIT ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDisco(serialNumber) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 Registro FROM vwConsumo WHERE componente = 'disco' and NumeroSerial = '${serialNumber}' ORDER BY ID DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT Registro FROM vwConsumo WHERE componente = 'disco' and NumeroSerial = '${serialNumber}' ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaxDisco(serialNumber) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'disco' and NumeroSerial = '${serialNumber}'`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'disco' and NumeroSerial = '${serialNumber}'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMaxRam(serialNumber) {
    
    var instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'ram' and NumeroSerial = '${serialNumber}'`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT valorMaximo FROM vwMaquina WHERE componente = 'ram' and NumeroSerial = '${serialNumber}'`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarMedidasEmTempoRealCpu(serialNumber) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `SELECT top 1
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'cpu'
                    order by ID desc`;
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'cpu'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTempoUso(serialNumber) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `select top 1 usoUsuario, usoOcioso,
        FORMAT(datahora,'%H:%m:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc;`;
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select usoUsuario, usoOcioso,
        DATE_FORMAT(datahora,'%H:%i:%s') as datahora from tbOciosidade where fkMaquina = '${serialNumber}' 
         order by idRegistro desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterInicioMonitoramento(serialNumber) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `select top 1 datahora
        from tbOciosidade where fkMaquina = '${serialNumber}' order by idRegistro;`;
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select datahora
         from tbOciosidade where fkMaquina = '${serialNumber}' order by idRegistro limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRam(serialNumber) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `SELECT top 1
                        Registro, 
                        CONVERT(varchar, Horario, 108) as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'ram'
                    order by ID desc`;
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
                        Registro, 
                        DATE_FORMAT(Horario,'%H:%i:%s') as momento_grafico 
                        FROM vwConsumo where NumeroSerial = '${serialNumber}' and Componente = 'ram'
                    ORDER BY ID DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidasCpu,
    buscarUltimasMedidasRam,
    buscarMedidasEmTempoRealCpu,
    buscarMedidasEmTempoRealRam,
    buscarUltimasMedidasDisco,
    buscarMaxDisco,
    buscarMaxRam,
    buscarUltimasMedidasOciosidade,
    buscarMedidasEmTempoRealTempoUso,
    obterInicioMonitoramento
}
