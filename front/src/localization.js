var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
export default function localization(setCenter) {
    function success(pos) {
        var crd = pos.coords
        setCenter({lat: crd.latitude, lng: crd.longitude})
    }
    if(navigator.geolocation) {
        navigator.permissions
            .query({ name: 'geolocation'})
            .then((r) => {
                if(r.state === 'granted'){
                    navigator.geolocation.getCurrentPosition(success)
                } else if (r.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(success, errors, options)
                } else if(r.state === 'denied') {
                    console.log('Localização indisponível')
                }
            })
    } else {
        alert('Localização indisponível')
    }
}
