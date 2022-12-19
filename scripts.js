  // INICIA DATATABLES
  document.addEventListener("DOMContentLoaded", function() {
    let listadoDomicilios = $("#tblDomicilios").DataTable({
      "ajax": {
        url: "domi_data.php?accion=listar_domicilio",
        dataSrc: ""
      },
      "columns": [
        { "data": "domi_id" },
        { "data": "barrio_nombre" },
        { "data": "barrio_comuna" },
        { "data": "trans_nombre" },
        { "data": "domi_valor" },
        { "data": "domi_hora_salida" },
        { "data": "domi_hora_llegada" },
        { "data": "user_nombre" },
        { "data": "domi_observacion" },
        { "data": null, "orderable": false },
        { "data": null, "orderable": false },
        { "data": null, "orderable": false }
      ],
      "columnDefs": [{
          targets: 9,
          "defaultContent": "<button class='btn btn-primary btnArriveHour'><i class='fa-solid fa-clock'></i></button>",
          data: null
        },
        {
          targets: 10,
          "defaultContent": "<button class='btn btn-primary btnEdit'><i class='fa-solid fa-pen'></i></button>",
          data: null
        },

        {
          targets: 11,
          "defaultContent": "<button  class='btn btn-danger btnDel'><i class='fa fa-trash-o fa-lg'></i></button>",
          data: null
        }
      ],
    });
    // FIN DATATABLES

// ejemplo select2
// $('#slct-barrio').select2({
//   ajax: {
//     //dropdownParent: $('#mdlDomicilios'),
//     url: 'getBarrio.php',
//     dataType: 'json',
//     type: 'POST',
//       // processResults: function (barrios_result) {
//       // Transforms the top-level key of the response object from 'items' to 'results'
//       //$('.selectBarrio select').html(response).fadeIn();
//       // return {
//       // results: barrios_result
//       // };
//     // }
//   }
// });

// $('#slct-barrio').select2({
//     ajax: {
//         url: "getBarrio.php",
//         type:'GET',
//         dataType: 'json',
//         delay: 250,
//         data: function (params) {
//             return {
//                 q: params.term // search term
//             };
//         },
//         processResults: function (data) {
//             // parse the results into the format expected by Select2.
//             // since we are using custom formatting functions we do not need to
//             // alter the remote JSON data
//             return {
//                 results: data
//             };
//         },
//         cache: true
//     },
//     minimumInputLength: 2
// });


$(document).ready(function() {
  $('#slct-barrio').select2();
});

// $('#slct-barrio').select2({
//     ajax: {
//         url: "getBarrio.php",
//         type:'GET',
//         dataType: 'json',
//         delay: 250,
//         data: function (params) {
//             return {
//                 q: params.term // search term
//             };
//         },
//         processResults: function (data) {
//             // parse the results into the format expected by Select2.
//             // since we are using custom formatting functions we do not need to
//             // alter the remote JSON data
//             return {
//                 results: data
//             };
//         },
//         cache: true
//     },
//     minimumInputLength: 2
// });



// $(document).ready(function(){
//    $('#slct-barrio').select2({
//     minimumInputLength: 2,
//     ajax: {
//       url: "getBarrio.php",
//       dataType: 'json',
//       data: function (term, page) {
//         return {
//           q: term
//         };
//       },
//       results: function (data, page) {
//         return { results: data };
//       }
//     }
//   });
// });


    // Contenido del Select Barrio
    // $(document).ready(function() {
    //   $.ajax({
    //     type: "POST",
    //     url: "getBarrio.php",
    //     success: function(response) {
    //       $('.selectBarrio select').html(response).fadeIn();
    //     }
    //   });
    // });
    // Contenido del Select Usuarios
    $(document).ready(function() {
      $.ajax({
        type: "POST",
        url: "getUser.php",
        success: function(response) {
          $('.selectUser select').html(response).fadeIn();
        }
      });
    });
    // Contenido del Select Transportador
    $(document).ready(function() {
      $.ajax({
        type: "POST",
        url: "getTransportador.php",
        success: function(response) {
          $('.selectTransportador select').html(response).fadeIn();
        }
      });
    });
    //tomar el valor del select y ponerlo en input
    $("#slct-barrio").change(function() {
      $('#npt-barrio_id').val($(this).val());
    });
    $("#slct-trans").change(function() {
      $('#npt-trans_id').val($(this).val());
    });
    $("#slct-user").change(function() {
      $('#npt-user_id').val($(this).val());
    });
    // EVENTOS DE BOTONES
    $('#btn-Add').click(function() {
      $('#btnConfirmAdd').show();
      $('#btnConfirmEdit').hide();
      limpiarFormulario();
      $("#mdlDomicilios").modal('show');
    });

    //MOSTRAR LA FECHA ACTUAL EN EL INPUT
    $('#horaActual').click(function() {
      let hour = actualDate();
      $('#npt-domi_hora_salida').val(hour);
    });


    $('#btnConfirmAdd').click(function() {
      //validar formulario emergente y enviarlo
      let valida_barrio = $('#npt-barrio_id').val();
      let valida_transportador = $('#npt-trans_id').val();
      let valida_valor = $('#npt-domi_valor').val();
      let valida_hora_salida = $('#npt-domi_hora_salida').val();
      let valida_asigna = $('#npt-user_id').val();
      if (valida_barrio.trim() == '') {
        alert('elija un barrio.');
        $('#slct-barrio').focus();
        return false;
      } else if (valida_transportador.trim() == '') {
        alert('Elija un transportador');
        $('#slct-trans').focus();
        return false;
      } else if (valida_valor.trim() == '') {
        alert('escriba un valor');
        $('#npt-domi_valor').focus();
        return false;
      } else if (valida_hora_salida.trim() == '') {
        alert('Revise hora de salida');
        $('#npt-domi_hora_salida').focus();
        return false;
      } else if (valida_asigna.trim() == '') {
        alert('elija quien asigna');
        $('#slct-user').focus();
        return false;
      } else {
        //ejecutar con todo validado
        $("#mdlDomicilios").modal('hide');
        let registro = recuperarDatosFormulario();
        agregarRegistro(registro);
        //alert("ok Validado");
      }
    });
    // fin validacion de formulario

    $('#btnConfirmEdit').click(function() {
      $("#mdlDomicilios").modal('hide');
      let registro = recuperarDatosFormulario();
      modificarRegistro(registro);
    });

    $('#tblDomicilios tbody').on('click', 'button.btnEdit', function() {
      //$('#btnConfirmEdit').show();
      let registro = listadoDomicilios.row($(this).parents('tr')).data();
      recuperarRegistro(registro.domi_id);
    });

    $('#tblDomicilios tbody').on('click', 'button.btnDel', function() {
      if (confirm("¿Confirma la Eliminación?")) {
        let registro = listadoDomicilios.row($(this).parents('tr')).data();
        borrarRegistro(registro.domi_id);
      }
    });
    // INTERACTUAR CON EL FORMULARIO MODAL

    function limpiarFormulario() {
      $('#npt-domi_id').val('');
      $('#npt-barrio_id').val('');
      $('#slct-barrio').val('0');
      $('#npt-trans_id').val('');
      $('#slct-trans').val('0');
      $('#npt-domi_valor').val('');
      $('#npt-domi_hora_salida').val('');
      $('#npt-user_id').val('');
      $('#slct-user').val('0');
      $('#npt-domi_observacion').val('');
    }

    function recuperarDatosFormulario() {
      let registro = {
        domi_id: $('#npt-domi_id').val(),
        barrio_id: $('#npt-barrio_id').val(),
        trans_id: $('#npt-trans_id').val(),
        domi_valor: $('#npt-domi_valor').val(),
        domi_hora_salida: $('#npt-domi_hora_salida').val(),
        user_id: $('#npt-user_id').val(),
        domi_observacion: $('#npt-domi_observacion').val(),
      };
      return registro;
    }


    // MUESTRA LA HORA ACTUAL
    function actualDate() {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      return time;
    };

    // COMUNICARSE CON EL SERVIDOR VIA AJAX
    function agregarRegistro(registro) {
      $.ajax({
        type: 'POST',
        url: 'domi_data.php?accion=agregar_domicilio',
        data: registro,
        success: function(msg) {
          listadoDomicilios.ajax.reload();
        },
        error: function() {
          alert("problema en: agregarRegistro");
        }
      });
    }

    function borrarRegistro(domi_id) {
      $.ajax({
        type: 'GET',
        url: 'domi_data.php?accion=borrar_domicilio&domi_id=' + domi_id,
        data: '',
        success: function(msg) {
          listadoDomicilios.ajax.reload();
        },
        error: function() {
          alert("Problema Borrando");
        }
      });
    }

    function recuperarRegistro(domi_id) {
      $.ajax({
        type: 'GET',
        url: 'domi_data.php?accion=consultar_domicilio&domi_id=' + domi_id,
        data: '',
        success: function(datos) {
          $('#nptEdit-domi_id').val(datos[0].domi_id);
          $('#nptEdit-barrio_nombre').val(datos[0].barrio_nombre);
          $('#nptEdit-trans_nombre').val(datos[0].trans_nombre);
          $('#nptEdit-domi_valor').val(datos[0].domi_valor);
          $('#nptEdit-domi_hora_salida').val(datos[0].domi_hora_salida);
          $('#nptEdit-user_nombre').val(datos[0].user_nombre);
          $('#nptEdit-domi_observacion').val(datos[0].domi_observacion);
          $("#mdlEditDomicilios").modal('show');
        },
        error: function() {
          alert("Problema recuperando");
        }
      });
    }

    function modificarRegistro(registro) {
      $.ajax({
        type: 'POST',
        url: 'domi_data.php?accion=modificar_domicilio&domi_id=' + registro.domi_id,
        data: registro,
        success: function(msg) {
          listadoDomicilios.ajax.reload();
        },
        error: function() {
          alert("Problema modificando");
        }
      });
    }

  });
