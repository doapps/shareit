$(function()
{
$('#frm').submit(function()
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
                url: 'http://www.siont.com.co/ws/webservices/login.php',
                data: { usuario_email: username, usuario_password: password}, 
                dataType: 'json',      
                success: function(data){
                    alert(data);
                },
                error: function(){
                    alert('error!');
                }
            });
        return false;
    }
});
});

$(function()
{
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