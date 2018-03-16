//Jeśli napiszemy kod "new nazwa_funkcji()" to dostaniemy obiekt typu "nazwa_funkcji"
function nazwa_funkcji() {
    console.log(this);  //'undefined'
    return "zwracane wartości";
}

nazwa_funkcji.name //->"nazwa_funkcji"

function NewObj(name) {
    this.name = name;   //NewObj("name") - Error / new NewObj("name") - OK (nowy obiekt)
    this.value = 123;
}

//Dodanie do obiektu typu 'NewObj' funkcji sayHello
NewObj.prototype.sayHello = function () {
    console.log("Hello, I'm " + this.name + "!"); //jest dostęp to this z obiektu 'NewObj'
}

//Nowość. Funkcjie można deklarować w ten sposób.
var arrow = (args) => {
    return args + args;
}
var simpler_arrow = (arg) =>  arg + arg ;

arrow(4); //8
simpler_arrow(4) //8

//Takie funkcje można używać łatwo jako callback'i
var doubled = [1, 2, 3, 4].map(simpler_arrow); //[2,4,6,8]

//Albo definiować je wewnątrz i robić z nich instrukcje
var tripled_and_filtered = [1, 2, 3, 4].map(x => x * 3).filter(x => x %2 == 0);   //[6, 12]

function CompareFunctions(name) {
    this.name = name;
    this.value = 123;

    //Poniższe funkcje dają taki sam efekt ("{name} !")
    this.arrow_function = (argument) => console.log(this.name + " !");

    this.normal_function = function(argument) {
        console.log(this.name + " !");
    }
}
var obj = new CompareFunctions("Mateusz");

//UWAGA! Zwykłe funkcje obiektu na zewnątrz mogą gubić właściwość this (patrz poniżej). Dlatego lepiej używać
//arrow functions wszędzie tam gdzie w funkcji korzystamy ze słowa this.
setTimeout(obj.arrow_function, 1000);   //"Mateusz !"
setTimeout(obj.normal_function, 1000);   //" !"
//Jeśli nie chcesz używać arrow function - zbinduj zwykłą funkcję.
setTimeout(obj.normal_function.bind(obj), 1000);   //"Mateusz !"