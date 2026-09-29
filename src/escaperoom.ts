// ========== Imports ==========

// ========== Logic ==========
export class Door {
    public isClosed:boolean;
    public color:string;

    public constructor(status:boolean, color:string){
        this.isClosed = status;
        this.color = color;
    }

    public isOpen():boolean{
        if(this.isClosed === false){
            return true;
        }

        return false;
    }

}

export class Key {
    public color:string;

    constructor(color:string){
        this.color = color;
    }
}

export class Player{
    public name:string;
    public keys:Key[];

    constructor(name:string){
        this.name = name;
        this.keys = [];
    }

    public addKey(key:Key){
        this.keys.push(key);
    }

    public useKey(door:Door, key:Key): Door{
        // vérifier si la porte est ouverte
        // Si ouverte, pas besoin d'utiliser la clé
        if(door.color === key.color){
            door.isClosed = false;
        }
        
        return door;
    }
}