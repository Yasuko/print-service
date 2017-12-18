<?php

/**
 * AccountController.
 *
 */
class AccountController extends Controller
{

    //protected $auth_actions = array('signout');

    public function signinAction()
    {
        return $this->Twigrender(
                        array("_token"    => $this->generateCsrfToken("reserve/signin")
                    ),
                    "reserve/ReserveSignin"
                );

    }

    public function authenticateAction(){

        if($this->session->isAuthenticated()){
            return $this->redirect("/reserve");
        }

        if(!$this->request->isPost()){
            $this->forward404();
        }

        $token = $this->request->getPost('_token');
        if(!$this->checkCsrfToken('/reserve/signin', $token)){
            return $this->redirect('/reserve/signin');
        }

        $user_name = $this->request->getPost('user_name');
        $password = $this->request->getPost('password');

        $errors = array();

        if(!strlen($user_name)){
            $errors[]["title"] = 'ユーザー名を入力して下さい';
        }

        if(!strlen($password)){
            $errors[]["title"] = 'パスワードを入力して下さい';
        }

        if(count($errors) === 0){
            $user_repository = $this->db_manager->get('Account');
            $user = $user_repository->fetchUseridAccount(
                                array("userid" => $user_name)
                            );

            if(!$user
                || ($user['password'] !== $user_repository->hashPassword($password))
            ){
                $errors[]["title"] = 'ユーザIDかパスワードが不正です。';
            }else{
                $this->session->setAuthenticated(true);
                $this->session->set('user',$user);

                return $this->redirect('/reserve');
            }
        }

var_dump($errors);
        return $this->Twigrender(
                array(
                    "_token"    => $this->generateCsrfToken("reserve/signin"),
                    "errors"    => $errors
                ),"reserve/ReserveSignin");
    }

    public function signoutAction()
    {

        $this->session->clear();
        $this->session->setAuthenticated(false);

        return $this->redirect("reserve/signin");

    }
}
