<?php
// This file is used as router
// If an action is defined
if (isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
    // Include the ProductManager class
    include './controller/ProductController.php';

    // Instantiate the ProductManager
    $productManager = new ProductController();

    // Gets the action
    $action = $_REQUEST['action'];

    // Extracts the data to perform the action if any.
    $data = isset($_POST['data']) ? $_POST['data'] : array();

    // Execute the action and return the result or the status INVALID ACTION.
    echo method_exists($productManager, $action) ? json_encode($productManager->$action($data)) : '{"status":"INVALID ACTION"}';
    return;
}

// Show the main view
echo include_once './view/index.html';