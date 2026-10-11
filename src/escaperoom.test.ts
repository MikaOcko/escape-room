// ========== Imports ==========
import { describe, expect, expectTypeOf, it } from "vitest";
import { Alarm, Door, Enigma, Item, Key, Player, Room } from "./escaperoom";
// ========== Logic ==========
describe("door",() => {
    it("ne peut pas être franchie", () => {
        const door = new Door(true, false, "blue");
        // vérifier si elle est fermée
        const openTheDoor = door.openTheDoor();
        expect(openTheDoor).toBeFalsy();
    });

    it("Une porte ouverte peut être franchie", () => {
        /*
            Ajoutez le comportement permettant de franchir une porte ouverte.
            La règle métier est :
            Une porte ouverte peut être franchie.
        */
        const door = new Door(false, false, "blue");
        // vérifier si elle est ouverte
        const openTheDoor = door.openTheDoor();
        expect(openTheDoor).toBeTruthy();
    });

    it("le joueur peut ouvrir la porte avec une clé", () => {
        const door = new Door(true, false, "blue");
        const key = new Key("blue");
        const player = new Player("Jane");

        player.addKey(key);
        const useKey = player.useKey(door,key);

        expect(useKey).toBe(true);
        expect(door.isClosed).toBe(false);
        expect(player.keys).toHaveLength(0);
    });

    it("Un joueur ne peut pas ouvrir une porte avec une clé qu'il ne possède pas", () => {
        const door = new Door(true, false, "blue");
        const key = new Key("blue");
        const player = new Player("Jane");

        const useKey = player.useKey(door,key);
        
        expect(useKey).toBe(false);
        expect(door.isClosed).toBe(true);
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
});

describe("Enigma", () => {
    it("le joueur a donnée une bonne réponse", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");

        player.answer = "Lorem ipsum dolor.";
        enigma.answer = "Lorem ipsum dolor.";

        const answer = player.giveAnswer(enigma);

        expect(answer).toBe(true);
    });

    it("le joueur a donnée une mauvaise réponse", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");

        player.answer = "Lorem ipsum dolor.";
        enigma.answer = "Integer tempor euismod.";

        const answer = player.giveAnswer(enigma);

        expect(answer).toBe(false);
    });

    it("un joueur peut franchir la porte s'il a résolu l'énigme", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");
        const door = new Door(true, false, "teal", enigma);

        player.answer = "Lorem ipsum dolor.";
        enigma.answer = "Lorem ipsum dolor.";

        const answer = player.giveAnswer(enigma);
        const openTheDoor = door.openTheDoor();

        expect(answer).toBe(true);
        expect(enigma.isResolved).toBe(true);

        expect(openTheDoor).toBe(true);
        expect(door.isClosed).toBe(false);
    });

    it("un joueur ne peut pas franchir la porte s'il n'a pas résolu l'énigme", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");
        const door = new Door(true, false, "teal", enigma);

        player.answer = "Lorem ipsum dolor.";
        enigma.answer = "Integer tempor euismod.";

        const answer = player.giveAnswer(enigma);
        const openTheDoor = door.openTheDoor();

        expect(answer).toBe(false);
        expect(enigma.isResolved).toBe(false);

        expect(openTheDoor).toBe(false);
        expect(door.isClosed).toBe(true);
    });

    it("Le joueur a donné 2 mauvaises réponses", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");

        enigma.answer = "Integer tempor euismod.";

        player.answer = "Lorem ipsum dolor.";
        const answer1 = player.giveAnswer(enigma);
        expect(answer1).toBe(false);

        player.answer = "Praesent augue neque.";
        const answer2 = player.giveAnswer(enigma);
        expect(answer2).toBe(false);

        player.answer = "Integer tempor euismod.";
        const answer3 = player.giveAnswer(enigma);
        expect(answer3).toBe(true);

        expect(enigma.counter).toBeLessThan(3);
        expect(enigma.counter).toEqual(2);
        expect(enigma.isResolved).toBe(true);
    });
    
    it("Le joueur a donné 3 mauvaises réponses", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");

        enigma.answer = "Integer tempor euismod.";

        player.answer = "Lorem ipsum dolor.";
        const answer1 = player.giveAnswer(enigma);
        expect(answer1).toBe(false);

        player.answer = "Praesent augue neque.";
        const answer2 = player.giveAnswer(enigma);
        expect(answer2).toBe(false);

        player.answer = "Nullam ut mattis.";
        const answer3 = player.giveAnswer(enigma);
        expect(answer3).toBe(false);

        expect(enigma.counter).toBeLessThanOrEqual(3);
        expect(enigma.isResolved).toBe(false);
    });

    it("Le joueur ne peut pas donner plus de 3 mauvaises réponses", () => {
        const enigma = new Enigma();
        const player = new Player("Jane");

        enigma.answer = "Integer tempor euismod.";

        player.answer = "Lorem ipsum dolor.";
        const answer1 = player.giveAnswer(enigma);
        expect(answer1).toBe(false);

        player.answer = "Praesent augue neque.";
        const answer2 = player.giveAnswer(enigma);
        expect(answer2).toBe(false);

        player.answer = "Nullam ut mattis.";
        const answer3 = player.giveAnswer(enigma);
        expect(answer3).toBe(false);

        player.answer = "Donec euismod luctus.";
        const answer4 = player.giveAnswer(enigma);
        expect(answer4).toBe(false);

        expect(enigma.counter).toBeGreaterThanOrEqual(3);
        expect(enigma.isResolved).toBe(false);

    });


});

// describe("Alarm", () => {
//     it("L'alarme devient active grace à une action", () => {
//         const alarm = new Alarm();

//         alarm.isActivatedBySomeoneOrSomething();

//         expect(alarm.isActivated).toBe(true);
//     });

//     it("L'alarme restera active même si elle est activée plusieurs fois", () => {
//         const alarm = new Alarm();

//         alarm.isActivatedBySomeoneOrSomething();
//         alarm.isActivatedBySomeoneOrSomething();
        
//         expect(alarm.isActivated).toBe(true);
//     });

//     it("L'alarme active peut être désactivée", () => {
//         const alarm = new Alarm();

//         alarm.isActivatedBySomeoneOrSomething();
//         alarm.isDesactivatedbySomeoneOrSomething();

//         expect(alarm.isActivated).toBe(false);
//     });

//     it("Une porte reliée à l'alarme ne peut pas être franchie lorsque l'alarme est active", () => {
//         const alarm = new Alarm();
//         const door = new Door(false, true, "yellow", );

//         alarm.isActivatedBySomeoneOrSomething();
        
//         const canPass = door.openTheDoor();

//         expect(alarm.isActivated).toBe(true);
//         expect(canPass).toBe(false);
//     });

//     it("Une porte non reliée à l'alarme peut être franchie lorsque l'alarme est active", () => {
//         const alarm = new Alarm();
//         const door = new Door(false, true, "yellow");

//         alarm.isActivatedBySomeoneOrSomething();
        
//         const canPass = door.openTheDoor();

//         expect(alarm.isActivated).toBe(true);
//         expect(canPass).toBe(true);
//     });

//     it("Une porte reliée à l'alarme peut être franchie lorsque l'alarme est désactivée.", () => {
//         const alarm = new Alarm();
//         const door = new Door(false, true, "yellow");

//         alarm.isActivatedBySomeoneOrSomething();
        
//         const canPass = door.openTheDoor();

//         expect(alarm.isActivated).toBe(false);
//         expect(canPass).toBe(true);
//     });

//     it("Une porte fermée non liée à l'alarme ne peut être franchie, même si l'alarme est active", () => {
//         const alarm = new Alarm();
//         const door = new Door(false, true, "yellow");

//         alarm.isActivatedBySomeoneOrSomething();
        
//         const canPass = door.openTheDoor();

//         expect(alarm.isActivated).toBe(true);
//         expect(door.isClosed).toBe(true);
//         expect(canPass).toBe(false);
//     });
//     // it("nomdutest", () => {});
// });
