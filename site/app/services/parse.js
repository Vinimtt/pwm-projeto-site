import Parse from 'parse';

// Inicializa a conexão com o Back4App
// Este código só precisa ser executado uma vez na sua aplicação
if (typeof window !== 'undefined') {
    Parse.initialize(
        process.env.NEXT_PUBLIC_BACK4APP_APPLICATION_ID,
        process.env.NEXT_PUBLIC_BACK4APP_JAVASCRIPT_KEY
    );
    Parse.serverURL = process.env.NEXT_PUBLIC_BACK4APP_SERVER_URL;
}

export default Parse;