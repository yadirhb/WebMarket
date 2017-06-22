<?php
include 'Controller.php';

/**
 * Controller class which is used to execute Product related actions.
 * User: yadirhb@gmail.com
 * Date: 6/22/2017
 * Time: 9:28 AM
 */
class ProductController extends Controller
{
    /**
     * @var string The table name.
     */
    private static $tblName = 'products';

    /**
     * Adds a new product to the database.
     * @param array $data The parameters used to execute the operation.
     * @return array The response object.
     */
    public function add(array $data)
    {
        if (!empty($data)) {
            $result = $this->db->insert(self::$tblName, $data);

            return $this->buildResponse($result, $result ? 'Product data has been added successfully.' : '');
        } else {
            return $this->buildResponse(false);
        }
    }

    /**
     * Gets the existing products.
     * @return array The response object.
     */
    public function view()
    {
        $response = array();
        $records = $this->db->getRows(self::$tblName);
        if ($records) {
            $response['records'] = $records;
            $response['status'] = 'OK';
        } else {
            $response['records'] = array();
            $response['status'] = 'ERR';
        }

        return $response;
    }

    /**
     * Edits an existing product information.
     * @param array $data The parameters used to execute the operation.
     * @return array The response object.
     */
    public function edit(array $data)
    {
        if (!empty($data)) {

            $condition = array('id' => $data['id']);
            $result = $this->db->update(self::$tblName, $data, $condition);

            return $this->buildResponse($result, $result ? 'Product data has been updated successfully.' : '');
        } else {
            return $this->buildResponse(false);
        }
    }

    /**
     * Deletes an existing product.
     * @param array $data The parameters used to execute the operation.
     * @return array The response object.
     */
    public function delete(array $data)
    {
        if (!empty($data['id'])) {
            $delete = $this->db->delete(self::$tblName, $data);
            return $this->buildResponse($delete, $delete ? 'Product data has been deleted successfully.' : '');
        } else {
            return $this->buildResponse(false);
        }
    }
}