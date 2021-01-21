$(function () {
    // 点击去注册账号
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})

var form = layui.form;
var layer = layui.layer;

form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    repwd: function (value) {
        var pwd = $('.reg-box [name="password"]').val()
        if (value !== pwd) {
            return '两次输入密码不一致!'
        }
    }
})
// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post(
        '/api/reguser',
        data,
        function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#link_login').click()
        }
    )
})

$('#from_login').submit(function (e) {
    e.preventDefault()
    $.post('/api/login',
        $(this).serialize(),
        function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            localStorage.setItem('token', res.token),
            location.href = 'index.html'
        })

})


