const formatAdress = (adress) => {
    return adress.replaceAll(" ",'%');
}

const extractData = (res) => {
    const data = {}
    data[longitude] = res.features[0].geometry.coordinates[0];
    data[latitude] = res.features[0].geometry.coordinates[1];
    data[label] = res.features[0].properties.label;
    return data;
}
export default helper