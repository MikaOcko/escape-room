// ========== Imports ==========
import { describe, expect, expectTypeOf, it } from "vitest";
import { Door } from "./escaperoom";
// ========== Logic ==========
describe("door",() => {
    it("ne peut pas être franchie", () => {
        /*
            Développez le comportement permettant de déterminer si une porte peut être franchie.
            La règle métier est :
            Une porte fermée ne peut pas être franchie.
        */
        const door = new Door(true);
        // vérifier si elle est fermée
        const isOpen = door.isOpen();
        expect(isOpen).toBeFalsy();
    });

    it("peut être franchie", () => {
        /*
            Ajoutez le comportement permettant de franchir une porte ouverte.
            La règle métier est :
            Une porte ouverte peut être franchie.
        */
               const door = new Door(false);
        // vérifier si elle est ouverte
        const isOpen = door.isOpen();
        expect(isOpen).toBeTruthy();
    });

    // it("nomdutest", () => {});
});
