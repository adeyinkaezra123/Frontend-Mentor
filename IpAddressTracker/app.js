
const search = document.querySelector('.search');
const ip = document.querySelector('.ip')
const city = document.querySelector('.city');
const country = document.querySelector('.country')
const zip = document.querySelector('.zip-code')
const timeZone = document.querySelector('.time-zone');
const isp = document.querySelector('.isp')
const submitBtn = document.querySelector('.submit')

let request = new Request("https://geo.ipify.org/api/v2/country,city?apiKey=at_HWj347o0hS90t5uOMm5Q6au6xainR&ipAddress=")
fetchData(request)
submitBtn.addEventListener('click',()=>{
    if(search.value.includes("@")){
        request = new Request("https://geo.ipify.org/api/v2/country,city?apiKey=at_HWj347o0hS90t5uOMm5Q6au6xainR&ipAddress=&email=" +search.value)
        fetchData(request)
    }
    else if(search.value.includes('www')){
        request =new Request(`https://geo.ipify.org/api/v2/country,city?apiKey=at_HWj347o0hS90t5uOMm5Q6au6xainR&ipAddress=&email=&domain=${search.value}`)
        fetchData(request)
    }
    else{
        request =new Request("https://geo.ipify.org/api/v2/country,city?apiKey=at_HWj347o0hS90t5uOMm5Q6au6xainR&ipAddress="+search.value)
        fetchData(request)
    }

})

search.addEventListener('keypress', function(key){
    if(key.keyCode == 13){
        submitBtn.click()
    }
})




let map = L.map('map', {zoomControl:false});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidmFsaS1ydXppYm9ldiIsImEiOiJja3U4d3plbXEwMTl3MnNsOTRxamR3M2h3In0.TlJ16ltIvaPKmUrrWklgtA'
}).addTo(map);
let myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:[50,50],
    iconAnchor:[25,50]
})
let marker = L.marker([0, 0],{
    icon:myIcon
}).addTo(map)
L.control.zoom({
    position:'bottomright'
}).addTo(map)

function fetchData(e){
    fetch(e)
    .then((response)=>
        response.json()
        )
        .then(data=>{
            if (data.ip == undefined){
                search.value = "Invalid input"
            }
            else if(!e.url.includes('https://geo.ipify.org/api/v2/country,city?apiKey=at_HWj347o0hS90t5uOMm5Q6au6xainR&ipAddress=&email=')){
                search.value = data.ip;
            }
            
            ip.textContent = data.ip
            city.textContent = data.location.city
            country.textContent = data.location.country
            zip.textContent = data.location.postalCode
        timeZone.textContent = data.location.timezone
        isp.textContent = data.isp
        let lat = data.location.lat
        let lng = data.location.lng
        
        marker.setLatLng([lat, lng])
        map.setView([lat, lng], 13);
    
    })
}
