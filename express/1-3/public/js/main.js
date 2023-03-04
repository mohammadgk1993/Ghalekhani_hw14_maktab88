   let users;

    console.log("Hello from server");

    // const newProduct = { 
    //     "name": "f",
    //     "date": "1372", 
    //     "id": 7822 
    // };

    $.ajax({
        type: "get",
        url: "/admin/get-all-users",
        success(data) {
            console.log(data);
            users = data
            tableRenderer(users)
            $('#sign-up table').css('display','none')
            $('#login table').css('display','none')
        },
        error(err) {
            console.log(err);
        },
    });

    console.log(users);

    function createNewUser(arrayOfusers,newUser) {
        newUser = {
            "firstname" : $('#firstname').val(),
            "lastname" : $('#lastname').val(),
            "username" : $('#username').val(),
            "password" : $('#password').val(),
            "gender" :$('#gender').val(),
        }

        if (users.some(item => item.username == newUser.username)) {
            window.alert('this username is already exist')
            return
        }

        $.ajax({
            type: "post",
            url: "/admin/new-user",
            data : newUser,
            success: function(data) {
                arrayOfusers.push(newUser)
                window.alert('Sign Up Successfully!')
            },
            error(err) {
                console.log(err);
            },
        });
    }

    function deleteUser(deleteId) {
        deleteId = $('#deleteId').val()
    
        $.ajax({
            type: "delete",
            url: `/admin/remove-user/${deleteId}`,
            data : deleteId,
            success: function(data) {
                $('table').remove();
                users = users.filter(item => item.username != deleteId)
                tableRenderer(users)
            },
            error(err) {
                console.log(err);
            },
        });
    }

    function tableRenderer(arrayOfObjects) {
        $.ajax({
            type: "get",
            url: "/admin/get-all-users",
            success(data) {
                console.log(data);
                users = data
            },
            error(err) {
                console.log(err);
            },
        });

        $('body').append('<table></table>')
        $('table').append('<tr></tr>')

        for (let i of Object.keys(users[0])) {
            $('tr').append(`<th>${i}</th>`)
        }

        for (let i = 0 ; i < users.length ; i++) {
            $('table').append('<tr></tr>')
            $('tr').click(function () {
                if ($('tr').index(this) == 0) return
                $('#read').css('display','flex')
                for (let j = 0 ; j < $(this).children().length ; j++) {
                    if (j == 0) {
                        $('#read').children().eq(j).text($(this).children().eq(j).text())
                    }
                    $('#read').children().eq(j).text($(this).children().eq(j).text())
                }
            });

            for (let j of Object.values(users[i])) {
                $('tr').eq(i+1).append(`<td>${j}</td>`)
            }
        }
    }

function readUser() {
    let user = {
        "username": $('#username-login').val(),
        "password": $('#password-login').val()
    }

    console.log(user)

    $.ajax({
        type: "GET",
        url: `/admin/get-user/${user.username}`,
        async:false,
        success: function (data) {
            console.log(data.username == user.username)
            console.log(data.password == user.password)
            if (data.username == user.username && data.password == user.password) {
                window.alert('Login Successfully')
                return
            }

            window.alert('username or password is invalid!')
        }
    });

    // if (existingUser.username == user.username && existingUser.password == user.password) {
    //     window.alert('Login Successfully!')
    //     return
    // }
}