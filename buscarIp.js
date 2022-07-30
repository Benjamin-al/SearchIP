//llamamos a la api que vamos a utilizar "IP Geolocation and Threat Detection"
const OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1150139e15msh15c49404dd1846dp1954e2jsned7c311e5f4a',
      'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
  }

const fetchIpinfo = ip => {
   return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,OPTIONS)//retornamos la url con la ip que viene por paramentro teniendo en consideracion que el fetch devuelve una pormesa
   .then(res => res.json())//resolvemos la promesa retornada del fetch y la trasformamos en on json
   .catch(err => console.error(err))//verificamos si tenemos un error
} 

//pasamos un selector para no repetir varias veces el querySelector
const $ = selector => document.querySelector(selector)


const form = $(".form")
const input = $(".input")
const submit = $(".submit")
const result = $(".results")

//escuchamos el evento submit
form.addEventListener('submit', async (event)=>{
    //evitamos que se refresque la pagina
    event.preventDefault()
    const {value}= input//recuperamos el valor que tiene dentro el input
    if(!value) return

    submit.setAttribute('disabled','')//desactivamos el bton para que asi el user no le pueda volver a dar click
    submit.setAttribute('aria-busy','true')
    //le pasamos la ip que esta en el input y colocamos un await ya que la funcion fetchIpinfo es asincrona
    const ipInfo = await fetchIpinfo(value)

    if(ipInfo){
        result.innerHTML = JSON.stringify(ipInfo,null,2)
    }

    submit.removeAttribute('disabled')//eliminamos el atributo 
    submit.removeAttribute('aria-busy')
})