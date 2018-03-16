var parameter = 'color';

var name = "test";
var obj = {
    value: 123,
    [parameter]: 'red', //color: 'red'  / to samo co: obj[parameter] = 'red'
    ['prefix_' + parameter]: 'green', //prefix_color: 'green'
    name,    //name: name / name: 'test'
    user: {
        name: "matt",
        id: 1232323
    }
};



console.log(obj);

//Dekonstrukcja obiektu (stary sposób)
var old_value = obj.value;
var old_color = obj.color;

//Dekonstrukcja obiektu (nowy sposób)
//Utworzone zostaną 3 zmienne (value, color_var, name_var) z wartościami z obj.
//'color_var' jeśli nie jest zdefiniowany, może przyjąć wartość domyślną (white)
var { value, color: color_var = 'white', user: { name: name_var } } = obj;

//Utworzone zostaną 2 zmienne a i b o wartościach odpowiednio 1, 3.
var [a, , b] = [1, 2, 3, 4];  //a=1, b=3

//Wykorzystanie dekonstrukcji w funkcji
var getUser1 = (data) => ({ name: data.user.name, id: data.user.id }) //{name: "matt", id: 1232323}

//Zdekonstruowany obj już w argumencie (bierzemy tylko właściwość 'user' jako zmienną 'prop')
var getUser2 = ({ user: prop }) => ({ name: prop.name, id: prop.id });


//Konstrukcja/Dekonstrukcja tablic
//użycie '...{zmienna}' może spakować podane argumenty (a,b,c,d) do tablicy [a,b,c,d] albo
//rozpakować tablice [a,b,c,d] do zbioru argumentów (a,b,c,d)
var table = [1, 2, 3, 4, 5];

//Dodanie '...{zmienna tablicowa}' spowoduje automatyczne rozpakowanie zmiennej tablicowej i dodanie jej do nowej tablicy
var newTable = [...table, 6, 7, 8]  //[1,2,3,4,5,6,7,8]

//Użycie argumentu '...args' spowoduje że wszystkie podane argumenty zostaną spakowane w tablicę.
var getTable = (...args) => args;

getTable(1, 2, 3, 4, 5) //[1,2,3,4,5] 