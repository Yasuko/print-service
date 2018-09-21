<?php

class PrintApplication extends Application{

    protected $login_action = array('account','signin');

    public function getRootDir(){

        return dirname(__FILE__);

    }

    protected function registerRoutes(){

        return array(

            '/'
                => array('controller' => 'index', 'action' => 'ajax'),
            '/aj'
                => array('controller' => 'ajax', 'action' => 'main'),
        );

    }

    protected function configure(){

        $this->db_manager->connect('master', array(
            'dsn'			=> 'mysql:dbname=print_service;host=localhost',
            'user'			=> 'reserve',
            'password'		=> '7VGPABXYjaYZZWcs',
        ));

    }

}

?>
