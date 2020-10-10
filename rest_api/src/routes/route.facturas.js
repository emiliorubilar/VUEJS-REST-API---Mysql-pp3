const express = require('express');
const router = express.Router();
const db = require('../database');

//encargado de listar datos de la base (READ)
router.get('/factura',(req,res) => {
        
    db.query('select * from Factura', (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            res.json('Error al traer los datos de la tabla factura')
        }
    });
    //res.json('haciendo uso de esta ruta a travez del metodo GET se obtendra una lista cliente');  

});
//encagado de eliminar datos de la base (DELETE)
router.delete('/factura/:id', (req,res) => {
    var id = req.params.id;
    db.query('delete from Factura where id_factura = ?', [id]);
    res.json('Se eliminó exitosamente!')

});
//encargado de cargar datos en la base(CREATE)
router.post('/factura', (req,res) => {
    const unaFactura = req.body;
    db.query('insert into Factura set ?',[unaFactura]);
    res.json('Se insertó exitosamente')
});
//encargado de actualizar un dato en la base(UPDATE)
router.put('/factura/:id',(req,res) => {
    const id = req.params.id;
    const unaFactura = req.body;
    db.query('update Factura set ? where id_factura = ?',[unaFactura,id]);
    res.json('Se actualizo exitosamente!!')

});
//filtar una factura (READ por ID)
router.get('/factura/:id',(req,res) => {
    const id = req.params.id;
    db.query('select * from Factura where id_factura = ?',[id],(err,rows) => {
        if(!err)
        {
            res.json(rows);
        }else{
            res.json('Ocurrio un error. Revisar')
        }
    });

})


module.exports = router;