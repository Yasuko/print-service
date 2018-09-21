<?php

class Authorization
{
    private $loginPath;
    private $allowTime = 604800;

    public function __construct()
    {

    }

    private function set_up()
    {
        session_start();

        if(!isset($_SESSION["timer"]) || !is_numeric($_SESSION["timer"])){
            $_SESSION["timer"] = time();
        }
    }

    /*
     * 認証済みのチェック
     */
    public function check()
    {
        if($_SESSION["auth"] && $this->check()){
            return true;
        }else{

            $this->authReset();
            return false;
        }
    }

    /*
     * ログイン後、所定の時間が経過しているかチェック
     */
    private function timeCheck(){

        if(!isset($_SESSION["timer"]) || !is_numeric($_SESSION["timer"])){
            return false;
        }else{

            if((time() - $_SESSION["timer"]) < $this->allowTime){
                return true;
            }else{
                return false;
            }

        }
    }


    private function authReset(){
        if (isset($_COOKIE["PHPSESSID"])) {
            setcookie("PHPSESSID", '', time() - 1800, '/');
        }
        unset($_SESSION["timer"]);
        session_destroy();
    }
}
