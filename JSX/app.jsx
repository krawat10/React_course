//function(data) Lepsza metoda na takie zmienne bo gdy dane nie dojdą na
// czas to będzie błąd. W tym przypadku element bedzie tworzony dopiero przy składaniu głównego
//komponentu (course)
var courseMedia = function (data) {
    return <img src={data.image} alt="Image of example" />;
}

//Warunkowe wstawianie elementów. Jeśli is_new jest true to Nowość, false - nic sie nie pojawi
var newLabel = function (data) {
    return data.is_new ? <span className="label label-default">Nowość</span> : null;
}

//Warunkowe wstawianie elementów. Jeśli is_promo jest true to Promocja, false - nic sie nie pojawi
var promoLabel = function (data) {
    return data.is_promo ? <b>PROMOCJA!</b> : null
}

//Przyciski akcji
var courseActions = function (data) {
    return (
        <div className="btn-group pull-right">
            <button type="button" className="btn btn-default">Szczegóły kursu</button>
            <button type="button" className="btn btn-default">Dodaj do ulubionych</button>
            <button type="button" className="btn btn-default">Dodaj do koszyka</button>
        </div>
    );
}

//Szczegóły kursu
var courseDetails = function (data) {
    return (
        <table className="table table-bordered" style={{ width: '250px' }}>
            <tbody>{/*React zgłosi błąd jak tego nie dodasz*/}
                <tr>
                    <th>Autor</th>
                    <th>{data.author}</th>
                </tr>
                <tr>
                    <th>Czas</th>
                    <th>{data.duration}</th>
                </tr>
            </tbody>
        </table>
    );
}

// w nawiasach nie wolno dodawać elementów blokowych(if, switch etc.)
var course = function (data) {
    return (
        <div className="media">
            <div className="media-left">

                {/* Media(obrazek). Element jest tworzony dopiero tutaj (bo to funkcja) */}
                {courseMedia(data)}

            </div>
            <div className="media-body">

                {/* Tytuł oraz warunkowy label(jeśli jest nowość) */}
                <h3>{data.title}{newLabel(data)}</h3>

                {/* Opis kursu */}
                <p>{data.description}</p>
                <p>{"W klamrach używamy javascriptu"}</p>

                {/* Promocja */}
                {promoLabel(data)}

                {/* Grupa przycisków */}
                {courseActions(data)}

            </div>
            <div className="media-right">

                {/* Course details colums */}
                {courseDetails(data)}

            </div>
        </div>
    );
}

//Wyświetlanie listy kursów
var CoursesList = function (list_item) {
    return (
        <div>
            {/* Wyświetlanie kilku elementów course na raz */}
            {/* Ważne jest aby używać propery key. Dzięki temu react
             nie musi porównywać wszystkich elementów. Ważne jest
             aby była to unikalna wartość. index z funkcji map nie 
             jest do końca dobrym rozwiązaniem bo lista może zmienić
              kolejność. Dobrym pomysłem jest jakieś id. Najlepiej to
              zrobić w miejscu renderowania obiektu (tutaj daliśmy 
              dodatkowy div) */}
            {list_item.map(function (data, index) {
                //Pojedyńczy kurs, data to dane jednego elementu listy
                return <div key={data.id}>{course(data)}</div>
            })}
        </div>
    );
}

var list = courses_data.slice(0, 6);

//renderowanie całego obiektu courses_data pobrane jest z osobnego pliku
ReactDOM.render(CoursesList(list), document.getElementById('root'));