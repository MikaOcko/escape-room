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
    public inventory:Item[];

    constructor(name:string){
        this.name = name;
        this.keys = [];
        this.inventory = [];
    }

    public addKey(key:Key) :void{
        this.keys.push(key);
    }

    public removeKey() : void{
        this.keys.pop();
    }

    public useKey(door:Door, key:Key): Door{
        // vérifier si la porte est ouverte
        // Si ouverte, pas besoin d'utiliser la clé
        if(door.color === key.color){
            door.isClosed = false;
            // enlève la clé de l'inventaire
            this.removeKey();
        }
        
        return door;
    }

    public collectItem(item:Item, room:Room){
        this.inventory.push(item);
        room.items.pop();
    }
}

export class Room{
    public items:Item[];

    constructor(){
        this.items = [];
    }

    public addItem(item:Item):void{
        this.items.push(item);
    }
}

export class Item{
    public name:string;

    constructor(name:string){
        this.name = name;
    }
}