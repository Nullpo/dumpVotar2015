# dumpVotar2015

Scriptcito para bajarse los datos publicos de las ultimas elecciones.

Los datos son abiertos, y son los que muestra el sitio web https://www.2015elecciones.gob.ar/

Por ahora solo probé con la query:

```
db.getCollection('documents').find(
{
    "body.datos": { $ne: "Mesa no escrutada."},
    $where: function(){
        var resumen = this.body.datos.resumen;
        return resumen.VotantesMesa < resumen.VotantesJef &&
        resumen.VotantesMesa < resumen.VotantesLeg &&
        resumen.VotantesMesa < resumen.VotantesCom &&
        resumen.VotantesMesa !== resumen.Electores;
    }
});
```

Y no tiró inconsistencias. Habría que tirar otras querys.

En https://github.com/Nullpo/dumpVotar2015/blob/master/dumpVotar1218.json/dumpVotar1218.json se puede encontrar el dump en formato JSON para que lo puedan consumir desde cualquier otra plataforma.
