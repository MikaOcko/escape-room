// ========== Imports ==========

// ========== Logic ==========
export class Door {
    public isClosed:boolean;

    public constructor(status:boolean){
        this.isClosed = status;
    }

    public isOpen():boolean{
        if(this.isClosed === false){
            return true;
        }

        return false;
    }
}