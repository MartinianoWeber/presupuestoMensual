const presupuestoDato = document.querySelector('#presupuesto')
const gasto = document.querySelector('#gasto')
const cantidad = document.querySelector('#cantidad')
const presupuestoText = document.querySelector('#presupuestoText')
const restante = document.querySelector('#restante')
const btnAgregar = document.querySelector('#btnAgregar')
const list = document.querySelector('#list')
const formulario = document.querySelector('#formulario')
const errorCampos = document.querySelector('#errorCampos')


// Obtenemos el presupuesto
let presupuestoArray = []
let gastosArray = []
let precioArray = []
let sumaArray = []

const presu =  {
    presupuesto:'',
}

const validacion =  { 
    validacion: '',
}

const datosEliminar = {
    eliminar: ''
}

class datos{
    constructor({tipo, total, id}){
        this.tipo = tipo
        this.total = total
        this.id = id
        this.presupuestoTotal
    }
    restar(){
        
        if(validacion.validacion === 1){
            let total = precioArray.reduce((a, b) => a - b, 0)
        let totalPresupuestado = presu.presupuesto + total
        if(totalPresupuestado >  presu.presupuesto*(60/100)){
            restante.style.backgroundColor = "green"
        }
        if((totalPresupuestado >  presu.presupuesto*(40/100)) && (totalPresupuestado <  presu.presupuesto*(60/100))){
            restante.style.backgroundColor = "rgb(86, 112, 13)"
        }
        if((totalPresupuestado >   presu.presupuesto*(1/100)) && (totalPresupuestado <  presu.presupuesto*(40/100))){
            restante.style.backgroundColor = "red"
        }
        restante.innerHTML = `
        <p> Restante: $${totalPresupuestado}
        `           
        }else{
            
            let prueba = precioArray.indexOf(datosEliminar.eliminar)
            precioArray.splice(prueba, 1)
            gastosArray.splice(0, 1)
            let total = precioArray.reduce((a, b) => a - b, 0)
            let totalPresupuestado = presu.presupuesto + total
            if(totalPresupuestado >  presu.presupuesto*(60/100)){
                restante.style.backgroundColor = "green"
            }
            if((totalPresupuestado >  presu.presupuesto*(40/100)) && (totalPresupuestado <  presu.presupuesto*(60/100))){
                restante.style.backgroundColor = "rgb(86, 112, 13)"
            }
            if((totalPresupuestado >   presu.presupuesto*(1/100)) && (totalPresupuestado <  presu.presupuesto*(40/100))){
                restante.style.backgroundColor = "red"
            }
            restante.innerHTML = `
            <p> Restante: $${totalPresupuestado}
            `              
        }
       
      
    }
   
}

const eventos =  {
    tipo:'',
    total: '',
    id: '', 
    validacion: '',
}



presupuestoDato.addEventListener('change', (e)=>{
        let cantidad = parseInt(e.target.value)
        if((typeof cantidad == 'number') && (cantidad >= 0)){
            presupuestoArray.push(cantidad)
            let total = presupuestoArray.reduce((a, b) => a + b, 0)
            presu.presupuesto = total
            presupuestoText.innerHTML = `
            <p> Presupuesto: $${total}
            `
            restante.innerHTML = `
            <p> Restante: $${total}
            `
            restante.classList.add('card2__restanteOk')
        }else{
            presupuestoText.innerHTML = `
            <p> Presupuesto: $error
            `
            restante.innerHTML = `
            <p> Restante: $error
            `
            errorCampos.innerHTML= `<p class="Error__campos"> Por favor solo numeros positivos y tampoco palabras o letras </p> `
            setTimeout(() =>{
                errorCampos.innerHTML = ""
            },3000)
            
        }
})

gasto.addEventListener('change', (e)=>{
    eventos.tipo = e.target.value;

    })

cantidad.addEventListener('change', (e)=>{
    prueba = parseInt(e.target.value)
    if((typeof prueba == 'number') && (prueba >= 0)){
    eventos.total= parseInt(e.target.value)
    eventos.id = Date.now()
    }else{
        errorCampos.innerHTML= `<p class="Error__campos"> Por favor solo numeros positivos y tampoco palabras o letras </p> `
        setTimeout(() =>{
            errorCampos.innerHTML = ""
        },3000)
        
    }
   

    })

btnAgregar.addEventListener('click', (e) =>{
    e.preventDefault()
    if((eventos.tipo !=='') && (eventos.total !=='')){
        gastosArray.push(new datos(eventos))
        
        let filtrado = gastosArray.filter(elm => elm.tipo === eventos.tipo)
        precioArray.push(filtrado[0].total)
        validacion.validacion = 1
        filtrado[0].restar()
        generarHtml ()
        formulario.reset()
        
    }else{
        errorCampos.innerHTML= `<p class="Error__campos"> Error campos vacios </p> `
        setTimeout(() =>{
            errorCampos.innerHTML = ""
        },3000)
        
    }
   
    })

function generarHtml (){
    list.innerHTML += `
    <div class="hijo2__card">
    <p>${eventos.tipo}</p>
    <p class="hijo2__number">$${eventos.total}</p>
    <p class="hijo2__number no-view">${eventos.total}</p>
    <a id="btnBorrar" href="#">Borrar x</a>
    </div>`
    const btnBorrar = document.querySelectorAll('#btnBorrar')
    
    btnBorrar.forEach(elm =>{
        elm.addEventListener('click', (e) => {
            e.preventDefault()

            let filtrado = gastosArray.filter(elm => elm.tipo === eventos.tipo)
            validacion.validacion = 2
            datosEliminar.eliminar = parseInt(e.path[1].childNodes[5].innerText)
            filtrado[0].restar()

            e.path[1].remove()
        })
    })
    
    }

