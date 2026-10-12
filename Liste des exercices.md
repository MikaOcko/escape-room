# Liste des exercices 

## Exercice 1
Développez le comportement permettant de déterminer si une porte peut être franchie.

La règle métier est :

Une porte fermée ne peut pas être franchie.

Utilisez la méthodologie TDD :

Écrivez le test correspondant à cette règle.
Vérifiez que le test échoue.
Écrivez le code nécessaire pour faire passer le test.
Vérifiez que le test passe.
Refactorisez votre code si nécessaire.

## Exercice 2
Ajoutez le comportement permettant de franchir une porte ouverte.

La règle métier est :

Une porte ouverte peut être franchie.

## Exercice 3
Ajoutez la possibilité d'ouvrir une porte nécessitant une clé.

Les règles métier sont :

chaque porte peut nécessiter une clé particulière ;
le joueur peut ouvrir la porte s'il possède la clé correspondante ;
le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante.

Exemple :

Porte rouge → red-key
Porte bleue → blue-key

## Exercice 4
Faites évoluer le comportement d'ouverture d'une porte.

Nouvelle règle métier :

Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur.

Exemple :

Avant :
inventory = ["red-key", "torch"]

Ouverture de la porte avec red-key

Après :
inventory = ["torch"]

Vérifiez avec vos tests que :

la porte est ouverte ;
la clé utilisée est retirée de l'inventaire ;
les autres objets sont conservés.

## Exercice 5
Ajoutez la possibilité pour un joueur de ramasser un objet présent dans une salle.

La règle métier est :

Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle.

Exemple :

Avant :

room.items = ["torch"]
player.inventory = []

Après :

room.items = []
player.inventory = ["torch"]

## Exercice 6
Faites évoluer le comportement du ramassage.

La règle métier est :

Un objet déjà ramassé ne peut pas être ramassé une seconde fois.

Testez notamment le cas où le joueur tente de ramasser un objet qui ne se trouve plus dans la salle.

Avant de coder, déterminez ce que doit faire le moteur dans cette situation.

## Exercice 7
Ajoutez la possibilité pour le joueur d'utiliser un objet.

La règle métier est :

Un joueur ne peut utiliser qu'un objet qu'il possède dans son inventaire.

Testez les deux situations :

le joueur possède l'objet ;
le joueur ne possède pas l'objet.

Déterminez le comportement attendu lorsqu'un joueur tente d'utiliser un objet qu'il ne possède pas.

## Exercice 8
Ajoutez la possibilité de protéger une porte avec une énigme.

Une porte peut être associée à une énigme.
Pour franchir la porte, l’énigme doit avoir été résolue.
Le joueur doit fournir la bonne réponse pour résoudre l’énigme.
Une mauvaise réponse ne permet pas de résoudre l’énigme.
Une fois résolue, l’énigme reste résolue.

À faire :

Écrivez les tests avant le code.
Testez au minimum :
    la bonne réponse
    une mauvaise réponse
    le franchissement d’une porte dont l’énigme n’est pas résolue
    le franchissement d’une porte dont l’énigme est résolue

Faites passer les tests puis refactorez si nécessaire.

## Exercice 9
Faites évoluer le fonctionnement des énigmes.

Chaque mauvaise réponse augmente le nombre de tentatives échouées.
Après 3 mauvaises réponses, une conséquence doit être déclenchée.
Une bonne réponse permet toujours de résoudre l’énigme.
Une énigme déjà résolue ne peut pas être résolue une seconde fois.

À faire :

Déterminez les cas à tester.
Écrivez les tests avant de modifier le code.
Vérifiez notamment les comportements à 2 puis 3 mauvaises réponses.

## Exercice 10
Ajoutez une alarme au jeu.

L’alarme peut être inactive ou active.
Une action permet d’activer l’alarme.
Une fois activée, l’alarme reste active jusqu’à sa désactivation.
Certaines portes ne peuvent pas être franchies lorsque l’alarme est active.
Une porte qui n’est pas concernée par l’alarme reste franchissable.

À faire :

Identifiez les différents comportements à tester.
Écrivez les tests avant le code.
Vérifiez que les règles précédentes continuent de fonctionner.

## Exercice 11
Faites évoluer la désactivation de l’alarme.

L’alarme peut être désactivée uniquement avec le bon code.
Un mauvais code ne désactive pas l’alarme.
Une fois l’alarme désactivée, les portes bloquées par l’alarme peuvent à nouveau être franchies.
Le code permettant de désactiver l’alarme est un objet alarm-code.
L’utilisation de cet objet le consomme.

À faire :

Écrivez les tests avant le code.
Testez les cas de réussite et d’échec.
Vérifiez que alarm-code disparaît de l’inventaire après utilisation.

## Exercice 12
Certaines portes nécessitent maintenant plusieurs conditions pour être franchies.

La porte du laboratoire nécessite :

la clé du laboratoire ;
l’alarme désactivée ;
l’énigme du laboratoire résolue.

À faire :

Testez chaque situation :
    aucune condition remplie ;
    uniquement la clé ;
    uniquement l’énigme ;
    uniquement l’alarme désactivée ;
    clé + énigme ;
    clé + alarme désactivée ;
    énigme + alarme désactivée ;
    les trois conditions réunies.