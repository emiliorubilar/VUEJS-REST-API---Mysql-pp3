const app = new Vue({

    el:"#principal",

    data:{

        nombre_producto:'',
        nombre_cliente:'',
        IVA:null,
        cantidad:null,
        subtotal:'',
        total:'',
        forma_pago:'',
        lista_facturas:[],
        id_busqueda:'',
        id_factura:null,
    },
    
    
    methods:{
        listarFacturas(){

            axios.get('http://localhost:4000/factura').then( resultado =>{
                this.lista_facturas = resultado.data;    

            });
        },
        eliminarFactura(id){
            axios.delete('http://localhost:4000/factura/'+id).then(resultado =>{
                 alert('factura eliminada');
                 this.listarFacturas();
            });
        },
        guardarFactura(){
            let unafactura = {
                nombre_producto:this.nombre_producto,
                nombre_cliente:this.nombre_cliente,
                IVA: this.IVA,
                cantidad: this.cantidad,
                subtotal:this.subtotal,
                total:this.total,
                forma_pago:this.forma_pago           

            }
            axios.post('http://localhost:4000/factura',unafactura).then(resultado => {
                alert(resultado.data);
                this.listarFacturas();
                this.nombre_producto = '';
                this.nombre_cliente = '';
                this.cantidad =null;
                this.subtotal ='';
                this.total = '';
                this.forma_pago ='';
            });
        },
        buscarFactura(){
            axios.get('http://localhost:4000/factura/'+this.id_busqueda).then( resultado =>{
                this.lista_facturas = resultado.data;                                
            });
        },
        editarFactura(id,producto,cliente,cantidad,subTotal,pago)
        {
            this.nombre_producto = producto;
            this.nombre_cliente = cliente;
            this.cantidad = cantidad;
            this.subtotal = subTotal;
            this.forma_pago = pago;
            this.id_factura = id;
        },
        actualizarFactura()
        {
            let unafactura = {
                nombre_producto:this.nombre_producto,
                nombre_cliente:this.nombre_cliente,
                cantidad: this.cantidad,
                subtotal:this.subtotal,
                forma_pago:this.forma_pago,
                total:this.total         

            }
            axios.put('http://localhost:4000/factura/'+this.id_factura,unafactura).then(resultado => {
                alert(resultado.data);
                this.listarFacturas();
                this.nombre_producto = '';
                this.nombre_cliente = '';
                this.IVA = null;
                this.cantidad =null;
                this.subtotal ='';
                this.total = '';
                this.forma_pago ='';
            });
        },
    },
    computed:{ 
        calculoiva:function(){
            var total1 = parseFloat( this.subtotal) * parseFloat(this.cantidad);
            var impuesto = (total1 * parseFloat(this.IVA))/100;
            this.total  = total1 + impuesto;
            if (!isNaN(this.total)){
                return this.total;
            } else {
                return "0";
            } 
        },        
    },
    

    
    
    created:function()
    {
        this.listarFacturas();
    }
    
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, dropdownOptions );
  });


