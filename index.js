const { spawn } = require('cross-spawn');
const readline = require('readline');
const Mic = require('node-microphone');

let mic = new Mic();
let micStream = mic.startRecording();
// micStream.pipe(process.stdout);

// Reemplaza 'notepad.exe' con la ruta o el nombre del ejecutable de la aplicación que deseas abrir

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Ingresar Comando: ',(res) => {
    abrirAplicacion(res);
});

function abrirAplicacion(comando){
    const appName = verComando(comando)
    // Ejecuta el comando 'start' de Windows para abrir la aplicación
    const childProcess = spawn('start', [appName], { shell: true });

    // Captura la salida estándar y muestra mensajes en la consola
    childProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    // Captura la salida de error y muestra mensajes en la consola
    childProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    // Maneja el evento de cierre del proceso
    childProcess.on('close', (code) => {
        console.log(`Proceso cerrado con código ${code}`);
    });
  
};

function verComando(comando) {

    if (comando.toLowerCase() === "code") {
        return "code.exe";
    }else if(comando.toLowerCase() === "google"){
        return "chrome.exe";
    }else if(comando.toLowerCase() === "caja"){
        return "C:\\Users\\Pelusa\\Desktop\\Electro-Avenida\\caja\\caja-win32-x64\\caja.exe"
    }else if(comando.toLowerCase() === "sistema" || comando.toLowerCase() === "electro" || comando.toLowerCase() === "facturacion"){
        return "C:\\Users\\Pelusa\\Desktop\\Electro-Avenida\\sistemaFacturacion\\electroavenida-win32-x64\\electroavenida.exe"
    };
}

