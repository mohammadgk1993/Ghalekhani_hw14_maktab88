   let products;

    console.log("Hello from server");

    // const newProduct = { 
    //     "name": "f",
    //     "date": "1372", 
    //     "id": 7822 
    // };

    $.ajax({
        type: "get",
        url: "/product/getProducts",
        success(data) {
            console.log(data);
            products = data
            tableRenderer(products)
        },
        error(err) {
            console.log(err);
        },
    });

    console.log(products);

    function createNewProduct(arrayOfProducts,newProduct) {
        newProduct = {
            "id" : $('#id').val(),
            "title" : $('#title').val(),
            "price" : $('#price').val(),
            "rating" : $('#rating').val(),
            "stock" :$('#stock').val(),
            "brand" : $('#brand').val(),
            "category" :$('#category').val()
        }

        $.ajax({
            type: "post",
            url: "/product/newProduct",
            data : newProduct,
            success: function(data) {
                $('table').remove();
                arrayOfProducts.push(newProduct)
                tableRenderer(arrayOfProducts.sort((a,b) => a.id - b.id))
            },
            error(err) {
                console.log(err);
            },
        });
    }

    function deleteProduct(deleteId) {
        deleteId = $('#deleteId').val()
    
        $.ajax({
            type: "delete",
            url: `/product/removeProduct/${deleteId}`,
            data : deleteId,
            success: function(data) {
                $('table').remove();
                products = products.filter(item => item.id != deleteId)
                tableRenderer(products)
            },
            error(err) {
                console.log(err);
            },
        });
    }

    function updateProduct(arrayOfProducts) {
        updateId = $('#read').children().eq(0).text()
        
        let newProduct = {}

        for (let key of Object.keys(products[0])) {
            newProduct[key] = ''
        }

        $('#read').children().eq(0).text()

        if ($('#read').children().eq(0).text() != '') {

            console.log($('#read').children().eq(0).text())

            for (let i = 1 ; i < $('#read').children().length - 1 ; i++) {
                if ($('#read').children().eq(i).val() == '') {
                    return
                }
            }

            newProduct.id = Number($('#read').children().eq(0).text())

            for (let i = 1 ; i < $('#read').children().length - 1 ; i++) {
                newProduct[Object.keys(newProduct)[i]] = $('#read').children().eq(i).val()
            }

            products = products.filter(item => item.id != newProduct.id)
            products.push(newProduct)

            $('table').remove()
            tableRenderer(products.sort((a,b) => a.id - b.id))

            $.ajax({
                type: "put",
                url: `/product/editProduct/${newProduct.id}`,
                data: newProduct,
                success:function(data) {
                    JSON.parse(data).filter(item => item.id == item.updateId)
                    // console.log(products.find(item => item.id != updateId))
                    // products.push(newProduct)
                    // tableRenderer(arrayOfProducts)
                },
                error(err) {
                    console.log(err);
                },
            });
        }

        console.log(newProduct)
    }

    function tableRenderer(arrayOfObjects) {
        $.ajax({
            type: "get",
            url: "/product/getProducts",
            success(data) {
                console.log(data);
                products = data
            },
            error(err) {
                console.log(err);
            },
        });

        $('body').append('<table></table>')
        $('table').append('<tr></tr>')

        for (let i of Object.keys(products[0])) {
            $('tr').append(`<th>${i}</th>`)
        }

        for (let i = 0 ; i < products.length ; i++) {
            $('table').append('<tr></tr>')
            $('tr').click(function () {
                if ($('tr').index(this) == 0) return
                $('#read').css('display','flex')
                for (let j = 0 ; j < $(this).children().length ; j++) {
                    if (j == 0) {
                        $('#read').children().eq(j).text($(this).children().eq(j).text())
                    }
                    $('#read').children().eq(j).val($(this).children().eq(j).text())
                }
            });

            for (let j of Object.values(products[i])) {
                $('tr').eq(i+1).append(`<td>${j}</td>`)
            }
        }
    }