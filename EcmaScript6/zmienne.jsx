if(true){
    let zmienna = "xd";
    console.log(zmienna);
}

//tutaj zmienna let nie zadziała bo działa ona tylko w obrębie nawaiasów {} i w głąb (zasięg funkcyjny)
//console.log(zmienna); //ERROR

for(var element in [1,2,3,4,5])
{
    console.log(element); // 0, 1, 2, 3, 4 - bo korzystamy z kluczy (in)
}

for (var element of [1, 2, 3, 4, 5]) {
    console.log(element); // 1, 2, 3, 4, 5 - tutaj już wartości (of)
}

for (var element of [1, 2, 3, 4, 5]) {
    setTimeout(() => {
         // 5, 5, 5, 5, 5 - tutaj narpierw sie wykonała szybko pętla a potem setTimeout   
         //var element został ciągle nadpisywany (bo była globalna)
        console.log(element); 
    }, 16);
}

//Zabezpieczenie
for (let element of [1, 2, 3, 4, 5]) {
    setTimeout(() => {
        //tutaj let element  nie był nadpisywany (nie jest globalna zmienna), tylko został poprawie 
        //przypisany do funkcji (zasięg funkcyjny)  
        console.log(element); // 1, 2, 3, 4, 5
    }, 16);
}

//w var korzystamy do zmiennych konfiguracyjnych itp.
//let w lokalnych funkcjach



const stala = 123;
console.log(stala);
//stala = 234; //ERROR - read-only

const obj = { value: 123}
obj.value = 334;    //OK - const działa tylko na jednym poziomie (wew. elmenty można zmieniać)
