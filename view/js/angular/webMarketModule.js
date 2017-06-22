/**
 * Created by yadir on 6/22/2017.
 */
// define application
angular.module("webMarket", [])
    .controller("productController", function ($scope, $http) {
        $scope.products = [];
        $scope.tempProductData = {};

        //initialize the vars
        $scope.addButton = false;
        $scope.updateButton = false;

        function resetButtonValues() {
            $scope.addButton = false;
            $scope.updateButton = false;
        }


        // function to submit the form after all validation has occurred
        $scope.submitForm = function (isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                if ($scope.addButton) {
                    //do save only operation
                    $scope.addProduct();
                } else if ($scope.updateButton) {
                    //do update operation
                    $scope.updateProduct();
                }

                // reset button values
                resetButtonValues();
            }
        };

        // function to get records from the database
        $scope.getRecords = function () {
            $http.get('./', {
                params: {
                    'action': 'view'
                }
            }).success(function (response) {
                if (response.status == 'OK') {
                    $scope.products = response.records;
                }
            });
        };

        function executeAction(action, data, callback) {
            // Request data object
            data = $.param({
                'data': data,
                'action': action
            });

            // Request config object
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            // Execute the request
            $http.post("./", data, config).success(callback);
        }

        // function to insert or update product data to the database
        $scope.saveProduct = function (action) {
            executeAction(action, $scope.tempProductData, function (response) {
                if (response.status === 'OK') {
                    if (action === 'edit') {
                        var product = $scope.products[$scope.index];
                        product.id = $scope.tempProductData.id;
                        product.code = $scope.tempProductData.code;
                        product.type = $scope.tempProductData.type;
                        product.name = $scope.tempProductData.name;
                        product.amount = parseInt($scope.tempProductData.amount);
                        product.price = parseFloat($scope.tempProductData.price);
                        product.destination = $scope.tempProductData.destination;
                        product.created = $scope.tempProductData.created;
                    } else {
                        $scope.products.push({
                            id: response.data.id,
                            code: response.data.code,
                            type: response.data.type,
                            name: response.data.name,
                            amount: parseInt(response.data.amount),
                            price: parseFloat(response.data.price),
                            destination: response.data.destination,
                            created: response.data.created
                        });
                    }
                    $scope.productForm.$setPristine();
                    $scope.tempProductData = {};
                    $('.formData').slideUp();
                    $scope.messageSuccess(response.msg);
                } else {
                    $scope.messageError(response.msg);
                }
            });
        };

        // function to add product data
        $scope.addProduct = function () {
            $scope.saveProduct('add');
        };

        // function to edit product data
        $scope.editProduct = function (product) {
            $scope.tempProductData = {
                id: product.id,
                code: product.code,
                type: product.type,
                name: product.name,
                amount: parseInt(product.amount),
                price: parseFloat(product.price),
                destination: product.destination,
                created: product.created
            };
            $scope.index = $scope.products.indexOf(product);
            $('.formData').slideDown();
        };

        // function to update product data
        $scope.updateProduct = function () {
            $scope.saveProduct('edit');
        };

        // function to delete product data from the database
        $scope.deleteProduct = function (product) {
            var conf = confirm('Are you sure to delete the product?');
            if (conf === true) {
                executeAction('delete', {'id': product.id}, function (response) {
                    if (response.status === 'OK') {
                        var index = $scope.products.indexOf(product);
                        $scope.products.splice(index, 1);
                        $scope.messageSuccess(response.msg);
                    } else {
                        $scope.messageError(response.msg);
                    }
                });
            }
        };

        // function to display success message
        $scope.messageSuccess = function (msg) {
            $('.alert-success > p').html(msg);
            $('.alert-success').show();
            $('.alert-success').delay(5000).slideUp(function () {
                $('.alert-success > p').html('');
            });
        };

        // function to display error message
        $scope.messageError = function (msg) {
            $('.alert-danger > p').html(msg);
            $('.alert-danger').show();
            $('.alert-danger').delay(5000).slideUp(function () {
                $('.alert-danger > p').html('');
            });
        };
    });