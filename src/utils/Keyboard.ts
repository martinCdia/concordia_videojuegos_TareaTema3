import { utils } from "pixi.js";

export class Keyboard {

    // Guarda el estado de las teclas (si están pulsadas o no)
    public static readonly state: Map<string, boolean> = new Map(); 

    /* Creamos objetos de tipo EventEmitter. 
       Evento que se dispara cuando una tecla es presionada(down) o se deja de presionar (up)*/
    public static readonly down: utils.EventEmitter = new utils.EventEmitter(); 
    public static readonly up: utils.EventEmitter = new utils.EventEmitter();

    private constructor() {

    };

    // Indica si ya hemos inicializado los listeners del navegador
    private static initialized: boolean = false; 

    // Inicializador de la clase
    public static initialize(): void { 
        
        // Si ya estaba inicializada la clase, finalizamos y salimos
        if(Keyboard.initialized){ 
            return;
        }

        Keyboard.initialized = true; // Marcamos como inicializada

        document.addEventListener("keydown", Keyboard.onKeyDown)
        document.addEventListener("keyup", Keyboard.onKeyUp)
    };

    private static onKeyDown(event: KeyboardEvent) {

        // Si la tecla no está pulsada, dispara el evento.
        if(Keyboard.state.get(event.code) != true){ 
            /*Esto hace que cuando se apriete una tecla, el down del keyboard emita un evento
              con el código de la tecla en cuestión*/
            Keyboard.down.emit(event.code);
        }
        
        // Añadir a la lista de pulsadas para que si mantengo pulsada la misma tecla, no siga emitiendo el evento
        Keyboard.state.set(event.code, true);  
    };

    private static onKeyUp(event: KeyboardEvent) {
        /*Esto hace que cuando se suelte una tecla, el up del keyboard emita un evento
          con el código de la tecla en cuestión*/
        Keyboard.up.emit(event.code);

        // Quitar de la lista de pulsadas para que si vuelvo a pulsar la misma tecla, emita nuevamente el evento
        Keyboard.state.set(event.code, false); 
    };
};