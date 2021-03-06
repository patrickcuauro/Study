﻿/* 
/* 
 * PARENT CODE
 */
function backToList() {
    var var_Id = $('#hdn_id_aerolinea').val();
    window.location.href = 'lst_aerolineas.aspx';
};
function load() {
    Permisos()
    $("#identificador").focus();

    $("#dv_Message").hide();
    $("#dv_Error").hide();
    $("#dv_error_modal").hide();
    $("#dv_error_modal2").hide();
    
    var recordId = $.url().param('id');
    var idt1 = $.url().param('idaerolinea');

    $('.loading').show()
    $('.btn').hide();
    $.ajax({
        type: "POST",
        url: "frm_aerolineas.aspx?fn=loadAll",
        data: '{"id":"' + recordId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('.loading').hide()
            $('.btn').show();

            if (response.error == '-1') {
                window.location.href = 'info.aspx';
                return false;
            }
            if (response.rslt == 'exito') {
                $('#comision').val(response.Comision);
                $('#nombre').val(response.Nombre);
                $('#razon_social').val(response.RazonSocial);
                $('#identificador').val(response.Identificador);
                $('#direccion').val(response.Direccion);
                $('#telefono_fijo').val(response.TelefonoFijo);
                $('#telefono_movil').val(response.TelefonoMovil);
                $('#email').val(response.Email);
                $('#web').val(response.Web);
                $('#codigo').val(response.Codigo);
                $('#IATA').val(response.IATA);
                
                //professionLoad()
                contactoLoad()
            }
            else {
                $("#dv_Message").hide()
                $("#dv_Error").html(response.msj);
                $("#dv_Error").show();
                setTimeout(function () { $('#dv_Error').hide(); }, 2000);
            }
        },
        error: function () {
            $('.loading').hide()
            $('.btn').show();
            $("#dv_Error").html('Error de comunicación con el servidor. El record no ha sido cargado.');
            $("#dv_Error").show();
            setTimeout(function () { $('#dv_Error').hide(); }, 2000);
        }
    });
};

function Permisos() {
    var v = $.url().param('v');
    $('.loading').show()
    $('.btn').hide();
    $.ajax({
        type: "POST",
        url: "frm_aerolineas.aspx?fn=permisos&v=" + v,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('.loading').hide()
            $('.btn').show();

            if (response.error == '-1') {
                window.location.href = 'info.aspx';
                return false;
            }

            if (response.rslt == 'exito') {
                if (response.Ver == 1) {
                    $("#btn_guardar").addClass('hide');
                    $("#Nombre").attr("disabled", "disabled");

                    $('#btn_contactoAdd').attr("disabled", "disabled");
                    $('#btn_contactoEdit').attr("disabled", "disabled");
                    $('#btn_contactoDelete').attr("disabled", "disabled");
                    
                    $("#Nombre").focus();
                }
            }
            else {
                $("#dv_error").html(response.msj);
                $("#dv_error").show();
                setTimeout(function () { $('#dv_error').hide(); }, 2000);
            }
        },
        error: function () {
            $('.loading').hide()
            $('.btn').show();
            $("#dv_error").html('Error de comunicación con el servidor. Función Permisos().');
            $("#dv_error").show();
            setTimeout(function () { $('#dv_error').hide(); }, 2000);
        }
    });
}
    //var msjModal
function save() {
        var record = {};
        record.hdn_id_aerolinea = $('#hdn_id_aerolinea').val();
        record.Codigo = $('#codigo').val();
        record.Nombre = $('#nombre').val();
        record.RazonSocial = $('#razon_social').val();
        record.Identificador = $('#identificador').val();
        record.Direccion = $('#direccion').val();
        record.TelefonoFijo = $('#telefono_fijo').val();
        record.TelefonoMovil = $('#telefono_movil').val();
        record.Email = $('#email').val();
        record.Web = $('#web').val();
        record.Comision = $('#comision').val();
        record.IATA = $('#IATA').val();
    
        $('.loading').show()
        $('.btn').hide();
        $.ajax({
            type: "POST",
            url: "frm_aerolineas.aspx?fn=saveAll",
            data: JSON.stringify(record),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                $('.loading').hide()
                $('.btn').show();

                if (response.error == '-1') {
                    window.location.href = 'info.aspx';
                    return false;
                }
                if (response.rslt == 'exito') {
                    var options = {
                        "backdrop": "static",
                        "keyboard": "true"
                    }

                    $('#hdn_id_aerolinea').val(response.hdn_id_aerolinea);
                    msjModal = $.remodal.lookup[$('[data-remodal-id=msjModal]').data('remodal')];
                    msjModal.open();
                    //$('#msjModal').modal(options);
                    //$('#msjModal').on('shown.bs.modal', function () {
                    if (response.msj != '') {
                        $("#msj").html("El record ha sido guardado con errores: " + response.msj);
                    }
                    else {
                        $('#hdn_id_aerolinea').val(response.id)
                        $("#msj").html("El record ha sido guardado con exito.");
                    }
                    //})
                }
                else {
                    $("#dv_Error").html(response.msj);
                    $("#dv_Error").show();
                    setTimeout(function () { $('#dv_Error').hide(); }, 2000);
                }
            },
            error: function () {

                $('.loading').hide()
                $('.btn').show();
                $("#dv_Error").html('Error de comunicación con el servidor. El record no ha sido actualizado.');
                $("#dv_Error").show();
                setTimeout(function () { $('#dv_Error').hide(); }, 2000);
            }
        });
}

//}
    function validate() {
        var result = $("#form2").valid();
        return result;
    };
    
    /* 
     * contacto CODE
     */
    function contactoAdd() {
        $('#hdn_contactoId').val(0);
        $('#NombreC').val();
        
        var options = {
            "backdrop": "static",
            "keyboard": "true"
        }
        modal = $.remodal.lookup[$('[data-remodal-id=modal]').data('remodal')];
        modal.open();
        //$('#modal').modal(options);
        //$('#modal').on('shown.bs.modal', function () {

        //})
    };

    var deletemodal;
    function contactoConfirm() {
        var options = {
            "backdrop": "static",
            "keyboard": "true"
        }
        deletemodal = $.remodal.lookup[$('[data-remodal-id=deleteModal2]').data('remodal')];
        deletemodal.open();
    };
    function contactoDelete() {
        var id = '';
        $('#tbl_contacto tr').each(function () {
            if ($(this).hasClass('row_selected')) {
                id += ',' + this.id;
            }
        });
        if (id == '') {
            $("#dv_error").html('Seleccione un registro');
            $("#dv_error").show();
            setTimeout(function () { $('#dv_error').hide(); }, 2000);
            return false;
        }

        $('.loading').show()
        $('.btn').hide();
        $.ajax({
            type: "POST",
            url: "frm_aerolineas.aspx?fn=contactoDelete",
            data: '{"hdn_contactoId":"' + id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('.loading').hide()
                $('.btn').show();
                deletemodal.close()
                //$('#deleteModal2').modal('hide');
                if (response.rslt == 'exito') {
                    $("#dv_Error2").hide()
                    $("#dv_Message2").html('El record ha sido eliminado.');
                    $("#dv_Message2").show();
                    setTimeout(function () { $('#dv_Message2').hide(); }, 2000);
                    $('#tbl_contacto').dataTable().fnDestroy();
                    contactoLoad();
                }
                else {
                    $("#dv_Error2").html(response.msj);
                    $("#dv_Error2").show();
                    setTimeout(function () { $('#dv_Error2').hide(); }, 2000);
                }
            },
            error: function () {
                $('.loading').hide()
                $('.btn').show();
                //$('#deleteModal2').modal('hide');
                deletemodal.close()
                $("#dv_Error2").html('Error de comunicación con el servidor. El record no ha sido actualizado.');
                $("#dv_Error2").show();
                setTimeout(function () { $('#dv_Error2').hide(); }, 2000);
            }
        });
    };
    function contactoEdit() {
        var id
        $('#tbl_contacto tr').each(function () {
            if ($(this).hasClass('row_selected')) {
                id = this.id;
                $("#hdn_contactoId").val(id);
            }
        });
        if (id == '') {
            $("#dv_error").html('Seleccione un registro');
            $("#dv_error").show();
            setTimeout(function () { $('#dv_error').hide(); }, 2000);
            return false;
        }
        $('.loading').show()
        $('.btn').hide();
        $.ajax({
            type: "POST",
            url: "frm_aerolineas.aspx?fn=contactoEdit",
            data: '{"hdn_contactoId":"' + id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('.loading').hide()
                $('.btn').show();

                if (response.rslt == 'exito') {
                    $('#NombreC').val(response.NombreC);
                    $('#CargoC').val(response.CargoC);
                    $('#TelefonoC').val(response.TelefonoC);
                    var options = {
                        "backdrop": "static",
                        "keyboard": "true"
                    }
                    modal = $.remodal.lookup[$('[data-remodal-id=modal]').data('remodal')];
                    modal.open();
                    //$('#modal').modal(options);
                    //$('#modal').on('shown.bs.modal', function () {
                    //})
                }
                else {
                    $("#dv_Message2").hide()
                    $("#dv_Error2").html(response.msj);
                    $("#dv_Error2").show();
                    setTimeout(function () { $('#dv_Error').hide(); }, 2000);
                }
            },
            error: function () {
                $('.loading').hide()
                $('.btn').show();
                modal.close();
                //$('#modal').modal('hide');
                $("#dv_Error2").html('Error de comunicación con el servidor. El record no ha sido actualizado.');
                $("#dv_Error2").show();
                setTimeout(function () { $('#dv_Error').hide(); }, 2000);
            }
        });
    };

        var pTable;
    function contactoLoad() {
        $('#tbl_contacto').dataTable().fnDestroy();
        $("#tbl_contacto tbody").click(function (event) {
            $(pTable.fnSettings().aoData).each(function () {
                $(this.nTr).removeClass('row_selected');
            });
            $(event.target.parentNode).addClass('row_selected');
        });
        pTable = $('#tbl_contacto').dataTable({
            "bProcessing": true,
            "bServerSide": false,
            "sAjaxSource": "frm_aerolineas.aspx?fn=contactoLoad",
            "bFilter": false,
            "bLengthChange": false,
            "bPaginate": false,
            "bInfo": false,
            "oLanguage": {
                "sInfo": "_TOTAL_ Registro(s) encontrado(s)",
                "sInfoFiltered": " - de _MAX_ registros",
                "sInfoThousands": ",",
                "sLengthMenu": "Mostrar _MENU_ Registros",
                "sLoadingRecords": "Por favor espere  - CARGANDO...",
                "sProcessing": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PROCESANDO...",
                "sSearch": "Buscar:",
                "sZeroRecords": "No se encontraron registros",
                "oPaginate": {
                    "sNext": " SIGUIENTE",
                    "sPrevious": "ANTERIOR "
                }
            },
            "aoColumns": [
                { "mDataProp": "Nombre" },
                { "mDataProp": "Cargo" },
                { "mDataProp": "Telefono" }
            ]
        });
    };
    function contactoSave() {
        var record = {};
        record.IdAerolinea = $('#hdn_contactoId').val();
        record.NombreC = $('#NombreC').val();
        record.CargoC = $('#CargoC').val();
        record.TelefonoC = $('#TelefonoC').val();

        $('.loading').show()
        $('.btn').hide();
        $.ajax({
            type: "POST",
            url: "frm_aerolineas.aspx?fn=contactosave",
            data: JSON.stringify(record),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('.loading').hide()
                $('.btn').show();
                modal.close();
                //$('#modal').modal('hide');
                if (response.rslt == 'exito') {
                    $("#dv_Error2").hide()
                    $("#dv_Message2").html('El record ha sido procesado con exito.');
                    $("#dv_Message2").show();
                    setTimeout(function () { $('#dv_Message2').hide(); }, 2000);
                    contactoLoad()
                }
                else {
                    $("#dv_Error2").html(response.msj);
                    $("#dv_Error2").show();
                    setTimeout(function () { $('#dv_Error2').hide(); }, 2000);
                }
            },
            error: function () {
                $('.loading').hide()
                $('.btn').show();
                //$('#modal').modal('hide');
                modal.close();
                $("#dv_Error2").html('Error de comunicación con el servidor. El record no ha sido actualizado.');
                $("#dv_Error2").show();
                setTimeout(function () { $('#dv_Error2').hide(); }, 2000);
            }
        });
    };
    function contactoValidate() {
        var result = $("#form2").valid();
        return result;
    };
    function buscarAerolinea() {
        var Identificador = $("#Identificador").val();

        $('.loading').show()
        $('.btn').hide();
        $.ajax({
            type: "POST",
            url: "frm_aerolineas.aspx?fn=validar_aerolinea",
            data: '{"Identificador":"' + Identificador + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('.loading').hide()
                $('.btn').show();

                if (response.error == '-1') {
                    window.location.href = 'info.aspx';
                    return false;
                }
                if (response.rslt == 'exito') {
                    $("#Identificador").val('');
                    $("#Identificador").focus();
                    $("#dv_Error").html("La Aerolinea '" + response.Nombre + "' ya esta registrada.");
                    $("#dv_Error").show();
                    setTimeout(function () { $('#dv_Error').hide(); }, 2000);
                    return false;
                }
                if (response.rslt == '') {
                    $("#dv_Error").show();
                    return false;
                }
                if (response.rslt == 'vacio') {
                    $("#Nombre").focus();
                    return false;
                }
                else {
                    $("#dv_Error").html(response.msj);
                    $("#dv_Error").show();
                    setTimeout(function () { $('#dv_Error').hide(); }, 2000);
                    $("#Identificador").focus();
                }
            },
            error: function () {
                $('.loading').hide()
                $('.btn').show();
                $("#dv_Error").html('Error de comunicación con el servidor. Funcion CargarCliente().');
                $("#dv_Error").show();
                setTimeout(function () { $('#dv_Error').hide(); }, 2000);
                $("#Identificador").focus();
            }
        });

    }
