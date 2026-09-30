// ========== Imports ==========

// ========== Logic ==========
export class Door {
    public isClosed:boolean;
    public color:string;
    public enigma?:Enigma;

    public constructor(status:boolean, color:string, enigma?:Enigma){
        this.isClosed = status;
        this.color = color;
        this.enigma = enigma;
    }

    // public isClosed:boolean;
    // public color:string;

    // public constructor(status:boolean, color:string){
    //     this.isClosed = status;
    //     this.color = color;
    // }

    public openTheDoor():boolean{
        if(this.isClosed === false){
            return true;
        }

        if(this.enigma?.isResolved === true){
            this.isClosed = false;
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
    public answer:string;

    constructor(name:string){
        this.name = name;
        this.keys = [];
        this.inventory = [];
        this.answer = "";
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

    public collectItem(item:Item, room:Room):boolean{
        // si item pas présent dans l'inventaire du joueur ET présent dans les objets de la pièce
        if(this.inventory.find((i) => i === item) && !room.items.find((i) => i === item)){
            return false;
        }

        this.inventory.push(item);
        room.items.pop();
        return true;
    }

    public useItem(item:Item):boolean{
        if(this.inventory.find((i) => i === item)){
            return true;
        }

        return false;
    }

    public giveAnswer(enigma:Enigma):boolean{
        if(this.answer === enigma.answer){
            enigma.isResolved = true;
            return true;
        }

        return false;
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

    public getItems():Item[]{
        return this.items;
    }
}

export class Item{
    public name:string;

    constructor(name:string){
        this.name = name;
    }
}

export class Enigma{
    public answer:string;
    public isResolved:boolean;

    constructor(){
        this.answer = "";
        this.isResolved = false;
    }

}