let Items=[];
let buttonIngresar=document.getElementById('Ingresar');
let buttonEliminar=document.getElementById('Eliminar');
let buttonEditar=document.getElementById('Editar');
let Table=document.getElementById('divTable');
//Fecha y Hora
setInterval(actualizarHoraFecha,1000)
function actualizarHoraFecha(){  
    let TiempoActual = new Date();
    let hora = TiempoActual.getHours();
    let minutos=TiempoActual.getMinutes();
    let segundos=TiempoActual.getSeconds();
    let horaImprimible = hora + " : " + minutos + " : " + segundos;
    let dia=TiempoActual.getDay();
    let mes=TiempoActual.getMonth();
    let anio=TiempoActual.getFullYear();
    let fecha=dia + "/" +mes + "/" +anio;
    document.getElementById('Time').innerHTML=horaImprimible;
    document.getElementById('fecha').innerHTML=fecha;
}
//Toma de datos
buttonIngresar.addEventListener('click',Ingresar);
function Ingresar(){
    let codigo= document.getElementById('InputCodigo').value;
    let elemento=document.getElementById('InputElemento').value;
    let costo= document.getElementById('InputCosto').value;
    let fechaIngreso=document.getElementById('InputFecha').value;
    if(codigo.length==0||elemento.length==0|| costo.length==0 ||fechaIngreso.length==0){
        alert('Llenar todos los campos');
    }else{
        if(/^\s+$/.test(codigo)||/^\s+$/.test(elemento)||fechaIngreso==""|| costo<0){
            alert('Campos Invalidos');
        }else{
            let ElementObject={Codigo:codigo, Elemento: elemento, Costo:costo,Fecha:fechaIngreso};
            Items.push(ElementObject);
            AgregarTable();
            console.log(Items);
        }
    }
    
}
//Insertar datos
function AgregarTable(){
let NewCodigo=document.createElement('div');
let NewElemento=document.createElement('div');
let NewCosto=document.createElement('div');
let NewFecha=document.createElement('div');
let i=Items.length-1;
NewCodigo.id='ElementCod'+i;
NewCodigo.textContent=Items[i].Codigo;
Table.appendChild(NewCodigo);
//------------------------------------
NewElemento.id='Element'+i;
NewElemento.textContent=Items[i].Elemento;
Table.appendChild(NewElemento);
//------------------------------------
NewCosto.id='ElementCos'+i;
NewCosto.textContent=Items[i].Costo;
Table.appendChild(NewCosto);
//-----------------------------------
NewFecha.id='ElementFech'+i;
NewFecha.textContent=Items[i].Fecha;
Table.appendChild(NewFecha);
total();
}
//Totales
function total(){
    let TE=document.getElementById('divTE');
    let TC= document.getElementById('divCT');
    let N=Items.length;
    let suma=0;
    for(let i=0;i<N;i++){
       suma=suma+Number(Items[i].Costo);
    }

    TC.innerHTML='$'+(Math.round(suma*100)/100);
    TE.innerHTML=N;
}
//Eliminar elemento
buttonEliminar.addEventListener('click',Eliminar);
function Eliminar(){
if(Items.length==0 ){
    alert('No hay elementos');
}else{
    let N=Number(prompt('Ingrese el numero de elemento a eliminar:'));
   
        if(isNaN(N) || N<1 || N>Items.length){
            alert('Error')
        }else{
        let deletingCod= document.getElementById('ElementCod'+(N-1));
        let deletingElement= document.getElementById('Element'+(N-1));
        let deletingCos= document.getElementById('ElementCos'+(N-1));
        let deletingFech= document.getElementById('ElementFech'+(N-1));
        Table.removeChild(deletingCod);
        Table.removeChild(deletingElement);
        Table.removeChild(deletingCos);
        Table.removeChild(deletingFech);
        Items.splice((N-1),1);
        total();
        console.log(Items);
        }
    
    }
}
//Editar elemento
buttonEditar.addEventListener('click',Editar);
function Editar(){
    if(Items.length==0 ){
        alert('No hay elementos');
    }else{
        let P=Number(prompt('Ingrese el numero de elemento a editar:'));
       
            if(isNaN(P) || P<1 || P>Items.length){
                alert('Error')
            }else{
            let editCod= document.getElementById('ElementCod'+(P-1));
            let editElement= document.getElementById('Element'+(P-1));
            let editCos= document.getElementById('ElementCos'+(P-1));
            let editFech= document.getElementById('ElementFech'+(P-1));
            let CodEdit=prompt('Ingrese nuevo codigo:');
            let ElementEdit=prompt('Ingrese nuevo elemento:');
            let CosEdit=Number(prompt('Ingrese nuevo costo:'));
            while(isNaN(CosEdit)){
                alert('Costo erroneo')
                 CosEdit=Number(prompt('Ingrese nuevo costo:'));
            }
            let FechaEdit=prompt('Ingrese nueva fecha:');
                Items[P-1].Costo=CosEdit;
                Items[P-1].Elemento=ElementEdit;
                Items[P-1].Costo=CosEdit;
                Items[P-1].Fecha=FechaEdit;
                editCod.innerHTML=CodEdit;
                editElement.innerHTML=ElementEdit;
                editCos.innerHTML=CosEdit;
                editFech.innerHTML=FechaEdit;
                total();
                console.log(Items);
            }
        
        }
}
