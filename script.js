const urlCap = 'https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/completion/getCapabilities'
const baseUrl ='https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q='
const adress ='21, rue Carpeaux,Paris'
const suffix ='&limit=10&returntruegeometry=true'
const baseUrlComp = 'https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/completion/?text='
const dpt = ['75','77','78','91','92','93','94','95']
const text = '7 rue des ec'
const suffixComp = '&type=StreetAddress&maximumResponses=15'
//a&terr=93160%2C97%2C77300&type=StreetAddress&maximumResponses=10
// console.log(dpt.join('%2C'))
const formatAdress = (adress) => {
    return adress.replaceAll(" ",'%');
}

const getCompletionList = () => {
    const dptQy = '&terr='+ dpt.join('%2C')
    const urlComp = baseUrlComp + text + dptQy + suffixComp;
    try {
        fetch(urlComp).then( (response) => {
            if (response.ok) {
                return response.json().then( (res) => {
                    for (item of res.results) {
                        console.log(item.fulltext);
                    }
                })
            }
        })
    }
    catch(err) {
        console.log(err.message);
    }
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


const getCap = () => {
    try {
        fetch(urlCap).then( (response) => {
            if (response.ok) {
                return response.json().then( (res) => {
                    console.log( res.indexes[1].fields[0].values.indexOf('adresse postale'))
                })
            }
        })
    }
    catch(err) {
        console.log(err.message);
    }
}
// getCoordinates()
// getCap();
getCompletionList();

// https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=21%20rue%20carpeaux%20Paris&limit=10&returntruegeometry=false

