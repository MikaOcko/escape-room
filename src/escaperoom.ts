// ========== Imports ==========

// ========== Logic ==========
export class Door {
    public isClosed:boolean;
    public color:string;
    public enigma?:Enigma;
    public linkedToAlarm:boolean;

    public constructor(isClosed:boolean, linkedToAlarm:boolean, color:string, enigma?:Enigma){
        this.isClosed = isClosed;
        this.linkedToAlarm = linkedToAlarm;
        this.color = color;
        this.enigma = enigma;
    }

    // public openTheDoor(alarm?:Alarm):boolean{
    //     if(!this.isClosed){
    //         if(this.enigma?.isResolved){
    //             this.isClosed = false;
    //         }

    //         return true
    //     }
        
    //     if(this.enigma?.isResolved){
    //         this.isClosed = false;
    //         return true
    //     }

    //     if(alarm?.isActivated){
    //         if(this.linkedToAlarm){
    //             return false;
    //         }

    //         return true;
    //     }

    //     return false;
    // }

    public openTheDoor(alarm?:Alarm):boolean{
        // Alarme activée et porte reliée à l'alarme : pas franchissable
        if(alarm?.isActivated && this.linkedToAlarm){
            return false;
        }

        // Porte ouverte : franchissable
        if(!this.isClosed){
            return true;
        }

        // Porte avec énigme : si éngime résolue > porte ouverte > franchissable
        if(this.enigma?.isResolved){
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

    public useKey(door:Door, key:Key): boolean{
        // // vérifier si la porte est ouverte
        // // Si ouverte, pas besoin d'utiliser la clé

        // Check si le joueur possède la clé
        if (!this.keys.includes(key)) {
            return false;
        }

        if (door.color !== key.color || !door.isClosed) {
            return false;
        }

        door.isClosed = false;
        // this.keys = this.keys.filter((ownedKey) => ownedKey !== key);
        this.removeKey();
        return true;
    }

    public collectItem(item:Item, room:Room):boolean{
        // si item pas présent dans l'inventaire du joueur ET présent dans les objets de la pièce
        // const alreadyOwned = this.inventory.find((i) => i === item);
        const alreadyOwned = this.inventory.includes(item);
        // const intoRoom = room.items.find((i) => i === item);
        const intoRoom = room.items.includes(item);

        if(alreadyOwned || !intoRoom){
            return false;
        }

        this.inventory.push(item);
        room.items = room.items.filter((roomItem) => roomItem !== item);
        return true;
    }

    public useItem(item:Item):boolean{
        if(this.inventory.find((i) => i === item)){
            return true;
        }

        return false;
    }

    public giveAnswer(enigma:Enigma):boolean{
        if(!enigma.isResolved){
            if(this.answer != enigma.answer){
                enigma.counter ++;
    
                if(enigma.counter >= 3){
                    this.bePunished();
                }
    
                return false;
            }
    
            if(this.answer === enigma.answer){
                enigma.isResolved = true;
            }

            return true;
        } else {
            return false;
        }
        
    }

    public bePunished(){
        console.log("Faites face à votre destin");
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
    public counter:number;

    constructor(){
        this.answer = "";
        this.isResolved = false;
        this.counter = 0;
    }

}

export class Alarm{
    public isActivated:boolean;

    constructor(){
        this.isActivated = false;
    }

    public isActivatedBySomeoneOrSomething():boolean{
        this.isActivated = true;
        return this.isActivated;
    }

    public isDesactivatedbySomeoneOrSomething():boolean{
        this.isActivated = false;
        return this.isActivated;
    }
}