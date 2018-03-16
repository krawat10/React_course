///Komponentami mogą być funkcje postaci. Nazwa każdego elementu musi zaczynać sie z dużej litery
//(react musi odróżnić elementy html od komponentów)
var ChildComponent = function(props) {

    //W props znajdują sie wszystkie przekazane atrybuty z rodzica komponentu
    return <img src={props.image} />;
}

//Poprawna składnia JSX dla takich elementów to <Komponent atrybut={wartość} />
var ParentComponent = (props) => {
    var image = props.image;
    return <div><ChildComponent image={image} /></div>
}


//(data) L=>epsza metoda na takie zmienne bo gdy dane nie dojdą na
// czas to będzie błąd. W tym przypadku element bedzie tworzony dopiero przy składaniu głównego
//komponentu (course)
var CourseMedia = (props) => {
    var { data } = props; //ES6  destrukturyzacja objektu props
    return <img src={data.image} alt="Image of example" />;
}

//Warunkowe wstawianie elementów. Jeśli is_new jest true to Nowość, false - nic sie nie pojawi
var NewLabel = ({ data, key }) => (data.is_new ? <span className="label label-default">Nowość</span> : null); 

//Warunkowe wstawianie elementów. Jeśli is_promo jest true to Promocja, false - nic sie nie pojawi
var PromoLabel = ({ data }) => (data.is_promo ? <b>PROMOCJA!</b> : null);


//Przyciski akcji
var CourseActions = ({ data }) => //ES6 destrukturyzacja objektu props 
    (
        <div className="btn-group pull-right">
            <button type="button" className="btn btn-default">Szczegóły kursu</button>
            <button type="button" className="btn btn-default">Dodaj do ulubionych</button>
            <button type="button" className="btn btn-default">Dodaj do koszyka</button>
        </div>
    );

//Szczegóły kursu
var CourseDetails = ({ data }) => //ES6 destrukturyzacja objektu props 
     (<table className="table table-bordered" style={{ width: '250px' }}>
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

// w nawiasach nie wolno dodawać elementów blokowych(if, switch etc.)
var Course = (props) => {
    var data = props.data;
    return (
        <div className="media">
            <div className="media-left">

                {/* Media(obrazek). Element jest tworzony dopiero tutaj (bo to funkcja) 
                Jeśli mamy kilka props jak key=1, data="text" możemy użyć destrukturyzacji
                props do tablicy (props.id, props.id, id -> [id, key title]). Nasz elmenent:
                <CourseMedia {...props} />
                jest równoważny z:
                <CourseMedia id={props.id} data={props.id} title={props.id} />              */}
                <CourseMedia {...props} />

            </div>
            <div className="media-body">

                {/* Tytuł oraz warunkowy label(jeśli jest nowość) */}
                <h3>{data.title}<NewLabel data={data} /></h3>

                {/* Opis kursu */}
                <p>{data.description}</p>
                <p>{"W klamrach używamy javascriptu"}</p>

                {/* Promocja */}
                <PromoLabel data={data} />

                {/* Grupa przycisków */}
                <CourseActions data={data} />

            </div>
            <div className="media-right">

                {/* Course details colums */}
                <CourseDetails data={data} />

            </div>
        </div>
    );
}

//Wyświetlanie listy kursów
var CoursesList = ({list}) => (
        <div>
            {/* Wyświetlanie kilku elementów course na raz */}
            {/* Ważne jest aby używać propery key. Dzięki temu react
             nie musi porównywać wszystkich elementów. Ważne jest
             aby była to unikalna wartość. index z funkcji map nie 
             jest do końca dobrym rozwiązaniem bo lista może zmienić
              kolejność. Dobrym pomysłem jest jakieś id. Najlepiej to
              zrobić w miejscu renderowania obiektu (tutaj daliśmy 
              dodatkowy div) */}
        {list.map((data) =>

                //Pojedyńczy kurs, data to dane jednego elementu listy.
                //'key' można stosować w każdym mapowanym komponencie JSX
                //bez jego definiowaia wewnątrz 
                 <Course data={data} key={data.id} />
                //Stary sposób:
                //return <div key={data.id}>{Course(data)}</div>
            )}
        </div>
    );


var list = [], page = 1, perpage = 3;
document.getElementById('show_more').addEventListener('click', function () {
    page++;
    update();
});

function update() {
    var count = page * perpage;
    list = courses_data.slice(0, count);

    //Jako komponenty można traktować funkcje (szablony)
    //var CoursesList = function (props) {...
    //renderowanie całego obiektu courses_data pobrane jest z osobnego pliku
    ReactDOM.render(<CoursesList list={list} />, document.getElementById('list'));
}

update();