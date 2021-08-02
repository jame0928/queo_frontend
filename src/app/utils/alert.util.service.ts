// Angular
import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2'
@Injectable({providedIn:'root'})
export class AlertUtilService{
	
    /**
	 * Service constructor
	 */    
	constructor() {

    }

    confirm(options:SweetAlertOptions = null){
        
        const optionsAlert:SweetAlertOptions = {...{
            title: 'Mensaje de confirmación',
            html: '',
            icon: 'info',
            showCancelButton:true,
            confirmButtonText: 'Sí',
            cancelButtonText:'No',
            confirmButtonColor:'#5867dd',
            cancelButtonColor:'#fd397a'
        },...options};

        return Swal.fire(optionsAlert)
    }
    
    success(options:SweetAlertOptions = null){
        
        const optionsAlert:SweetAlertOptions = {...{
            title: 'Notificación',
            html: '',
            icon: 'success',
            toast:true,
            timer:3000,
            position:'top-end',
            showConfirmButton:false,
        },...options};

        return Swal.fire(optionsAlert)
    }
    
    warning(options:SweetAlertOptions = null){
        
        const optionsAlert:SweetAlertOptions = {...{
            title: 'Notificación',
            html: '',
            icon: 'warning',
            toast:true,
            timer:3000,
            position:'top-end',
            showConfirmButton:false,
        },...options};

        return Swal.fire(optionsAlert)
    }
    
    error(options:SweetAlertOptions = null){
        
        const optionsAlert:SweetAlertOptions = {...{
            title: 'Error',
            html: '',
            icon: 'error',
            toast:true,
            timer:3000,
            position:'top-end',
            showConfirmButton:false,
        },...options};

        return Swal.fire(optionsAlert)
    }


    
    
    
    view(options:SweetAlertOptions = null){
        
        const optionsAlert:SweetAlertOptions = {...{
            title: 'Detalle',           
            position:'center',
            showConfirmButton:false,
        },...options};

        return Swal.fire(optionsAlert)
    }

}