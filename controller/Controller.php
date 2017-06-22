<?php

/**
 * Defines base method reusable by the rest of controllers.
 * User: yadirhb@gmail.com
 * Date: 6/22/2017
 * Time: 10:38 AM
 */
class Controller
{
    /**
     * @var DBManager instance to handle the database.
     */
    protected $db;

    public function __construct()
    {
        require_once(dirname(dirname(__FILE__)) . '/db/DBManager.php');
        $this->db = new DBManager();
    }

    /**
     * Builds a response object containing status and msg.
     * @param $result Object containing the operation result.
     * @param string $msg Custom message.
     * @return array Contains the response object.
     */
    protected function buildResponse($result, $msg = 'Operation executed successfully.')
    {
        $response = array('data' => $result);
        if ($response) {
            $response['status'] = 'OK';
            $response['msg'] = $msg;
        } else {
            $response['status'] = 'ERR';
            $response['msg'] = 'Some problem occurred, please try again.';
        }
        return $response;
    }
}