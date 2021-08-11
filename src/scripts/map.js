;
(function() {
    let myMap;
    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [56.828371, 60.624425],
            zoom: 12,
            controls: []
        });
        const coords = [
            [56.828371, 60.624425],
            [56.844763, 60.590410],
            [56.825718, 60.606615],
            [56.801371, 60.563919],
            [56.893155, 60.572331]
        ];
        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './images/marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });
        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });
        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable('scrollZoom');
    }
    ymaps.ready(init);
})()
let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [56.828371, 60.624425],
        zoom: 12,
        controls: []
    });
    const coords = [
        [56.828371, 60.624425],
        [56.844763, 60.590410],
        [56.825718, 60.606615],
        [56.801371, 60.563919],
        [56.893155, 60.572331]
    ];
    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './images/marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });
    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });
    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
}
ymaps.ready(init);