const baseUrl ='https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q='
const adress ='21, rue Carpeaux,Paris'
const suffix ='&limit=10&returntruegeometry=false'

const formatAdress = (adress) => {
    return adress.replaceAll(" ",'%');
}

const getCoordinates = () => {
    const url = baseUrl + formatAdress(adress) + suffix;
    console.log(formatAdress(adress))
    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request Failed')
    },  networkError => {
        console.log(networkError.message)
        })
        .then(jsonResponse=>{
            // renderRawResponse(jsonResponse);
            console.log(jsonResponse.features[0].geometry.coordinates);
        })
}
getCoordinates()

// https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=21%20rue%20carpeaux%20Paris&limit=10&returntruegeometry=false