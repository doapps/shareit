/*verificamos session*/
window.onload = function()
{
    var session_usuario_id = window.localStorage.getItem('usuario_id');
    if (session_usuario_id.length<=0)
    {
        $.mobile.changePage("#login");
    }
    else
    {
        
    }

}
/**/


$(function(){
    
    /*cerrar sesion*/
    $('#update').click(function(){
            var session_usuario_id = window.localStorage.getItem('usuario_id');
            alert(session_usuario_id);
            $.ajax({
            type: 'POST',
            dataType: "json",
            url: 'http://www.siont.com.co/ws/webservices/get_imagenes.php',
            data: { usuario_id: session_usuario_id},
            success: function(data){
                //alert(data);
                if (data.success == 1) 
                {
                    $('#timeline').html("<div class='jqm-block-content'>
                        <a href='#perfilamigo'><h3><img src='"+data.IMAGENES[0].USUARIO_IMAGEN+"' class='imagen'>"+data.IMAGENES[0].USUARIO_USERNAME+"</h3></a>
                        <p>"+data.IMAGENES[0].IMAGEN_DESCRIPCION+"</p>
                        <center>
                        <a href='#imagenamplia' data-rel='popup' data-position-to='window' data-transition='fade'><img class='imagen2' src='"+data.IMAGENES[0].IMAGEN_URL+"' ></a>
                        <div data-role='controlgroup' data-type='horizontal' data-mini='true'>
                        <p>12 Me gusta</p>
                        <a href='#' data-role='button' data-icon='check' >Me gusta</a>
                        <a href='#Compartir' data-role='button' data-rel='popup' data-position-to='window' data-icon='heart'>Compartir</a>
                        </div>
                        </center>
                        </div>");
                }
                else
                {
                    alert(data.message);
                }
            },
            error: function(){
                alert('error!');
            }
        });
    });
    /**/

    /*cerrar sesion*/
    $('#logout').click(
        function()
        {
            window.localStorage.removeItem('usuario_id');
            alert(window.localStorage.getItem('usuario_id'));
            $.mobile.changePage("#login");
    });
    /**/

    /*iniciar sesion*/
    $('#form_login').submit(function()
    {
        var username = $('#email').val();
        var username = $.trim(username);
        var password = $('#password').val();
        var password = $.trim(password);
        if(username=='')
        {
            $('.error').html('Please enter username');
            return false;
        }
        else if(password =='')
        {
            $('.error').html('Please enter password');
            return false;
        }
        else
        {
            $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: 'http://www.siont.com.co/ws/webservices/login.php',
                    data: { usuario_email: username, usuario_password: password},
                    success: function(data){
                        //alert(data);
                        if (data.success == 1) 
                        {
                            //alert(data.USUARIOS[0].USUARIO_ID);
                            window.localStorage.setItem('usuario_id', data.USUARIOS[0].USUARIO_ID);
                            var usuario_id = window.localStorage.getItem('usuario_id');
                            alert(usuario_id);
                            $.mobile.changePage("#inicio");
                        }
                        else
                        {
                            alert(data.message);
                        }
                    },
                    error: function(){
                        alert('error!');
                    }
                });
            return false;
        }
    });
    
    /*registrar usuario*/
    $('#form_register').submit(function()
    {
        var username = $('#usuario').val();
        var username = $.trim(username);
        var password = $('#pass').val();
        var password = $.trim(password);
        var repassword = $('#pass2').val();
        var repassword = $.trim(password);
        var email = $('#correo').val();
        var email = $.trim(email);

        if(username=='')
        {
            $('.error').html('Please enter username');
            return false;
        }
        else if(password =='')
        {
            $('.error').html('Please enter password');
            return false;
        }
        else
        {
            var user = $('[name=usuario]').val();
            var pass = $('[name=pass]').val();
            var mail = $('[name=correo]').val();
            $.ajax({
            type: 'POST',
            url: 'http://www.siont.com.co/ws/webservices/register.php',
            data: { usuario_username: user, usuario_password: pass, usuario_email: mail},       
            success: function(data){
                alert(data.success);
            },
            error: function(){
                alert('error!');
            }
        });
     return false;
        }
    });

});

