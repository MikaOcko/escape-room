// ========== Imports ==========
import { describe, expect, expectTypeOf, it } from "vitest";
import { Door, Item, Key, Player, Room } from "./escaperoom";
// ========== Logic ==========
describe("door",() => {
    it("ne peut pas être franchie", () => {
        /*
            Développez le comportement permettant de déterminer si une porte peut être franchie.
            La règle métier est :
            Une porte fermée ne peut pas être franchie.
        */
        const door = new Door(true, "blue");
        // vérifier si elle est fermée
        const isOpen = door.isOpen();
        expect(isOpen).toBeFalsy();
    });

    it("Une porte ouverte peut être franchie", () => {
        /*
            Ajoutez le comportement permettant de franchir une porte ouverte.
            La règle métier est :
            Une porte ouverte peut être franchie.
        */
        const door = new Door(false, "blue");
        // vérifier si elle est ouverte
        const isOpen = door.isOpen();
        expect(isOpen).toBeTruthy();
    });

    it("ouvrir la porte avec une clé", () => {
        /*
            Ajoutez la possibilité d'ouvrir une porte nécessitant une clé.
            
            Les règles métier sont :
            - chaque porte peut nécessiter une clé particulière ;
            - le joueur peut ouvrir la porte s'il possède la clé correspondante ;
            - le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante.

            Exemple :
            - Porte rouge → red-key
            - Porte bleue → blue-key
        */
        // Vérifier si une porte a besoin d'une clé
        // Si porte fermée, utilisé la clé

        const door = new Door(true, "blue");
        const key = new Key("blue");
        const player = new Player("Jane");

        player.addKey(key);

        player.useKey(door,key);

        expect(door.isClosed).toBe(false);
        expect(player.keys).toHaveLength(0);

    });
});

describe("Player", () => {
    it("quand un joueur ramasse un objet, il l'ajoute à son inventaire. Plus, l'objet est retiré de la salle.", () => {
        const player = new Player("Jane");
        const item = new Item("radio");
        const room = new Room();

        room.addItem(item);
        expect(room.items).toHaveLength(1);
        expect(player.inventory).toHaveLength(0);

        player.collectItem(item, room);
        expect(room.items).toHaveLength(0);
        expect(player.inventory).toHaveLength(1);
        expect(player.inventory).toContain(item);
    });

    it("Un joueur ne peut pas ramassé deux fois le même objet.", () => {
        const player = new Player("Jane");
        const item = new Item("radio");
        const room = new Room();

        room.addItem(item);

        player.collectItem(item, room);
        const pickUpItemTwice = player.collectItem(item, room);
        
        expect(pickUpItemTwice).toBe(false);
        expect(player.inventory).toHaveLength(1);

    });

    
    it("Un joueur peut utiliser un objet qu'il possède dans son inventaire", () => {
        const player = new Player("Jane");
        const item = new Item("radio");
        const room = new Room();

        room.addItem(item);

        player.collectItem(item,room);

        expect(player.inventory).toHaveLength(1);

        const useItem = player.useItem(item);

        expect(useItem).toBe(true);
    });

    it("Un joueur ne peut pas utiliser un objet qu'il ne possède pas dans son inventaire", () => {
        const player = new Player("Jane");
        const item = new Item("radio");
        const room = new Room();

        room.addItem(item);


        expect(player.inventory).toHaveLength(0);

        const useItem = player.useItem(item);

        expect(useItem).toBe(false);
    });

    // it("nomdutest", () => {});
});
