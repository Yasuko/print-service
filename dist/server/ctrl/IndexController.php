<?php

/**
 * ReserveController.
 *
 */
class IndexController extends Controller
{
    //protected $auth_actions = array('index', 'signout', 'follow');
    private $_job = "";
    private $_id = "";
    private $_data = [];

    public function DefaultAction()
    {
        return $this->Twigrender(array(),"Index/Index");
    }


    public function AjaxAction(){

        $this->_data = $this->request->getJson();
        $this->_job = $this->_data['job'];
        $this->_id = (isset($this->_data['id']))?$this->_data['id']:false;

        if(!is_null($this->_job)){

            switch ($this->_job) {
                /**
                * データ取得
                **/
                case 'get_m':   $this->getData('Monster');   break;
                case 'get_s':   $this->getData('Skill');     break;
                case 'get_l':   $this->getData('Reader');    break;
                case 'get_a':   $this->getData('Arousal');   break;
                case 'get_t':   $this->getData('Type');      break;
                case 'get_at':  $this->getData('Attribute'); break;
                case 'get_u':   $this->getData('User');      break;

                /**
                * データ追加
                **/
                case 'add_m':   $this->addNewData('Monster');   break;
                case 'add_s':   $this->addNewData('Skill');     break;
                case 'add_l':   $this->addNewData('Reader');    break;
                case 'add_a':   $this->addNewData('Arousal');   break;
                case 'add_t':   $this->addNewData('Type');      break;
                case 'add_at':  $this->addNewData('Attribute'); break;
                case 'add_u':   $this->addNewData('User');      break;
                /**
                * データ更新
                **/
                case 'update_m':  $this->updateData('Monster');    break;
                case 'update_s':  $this->updateData('Skill');      break;
                case 'update_l':  $this->updateData('Reader');     break;
                case 'update_a':  $this->updateData('Arousal');    break;
                case 'update_t':  $this->updateData('Type');       break;
                case 'update_at': $this->updateData('Attribute');  break;
                case 'update_u':  $this->updateData('User');       break;
                /**
                * 認証
                **/
                case 'auth': $this->authUser();
            }
        }
    }

    /**
     * 
     * 取得処理
     *
     */

    public function getData($repository){
        if($this->_id == "all"){
            $data = $this->db_manager->get($repository)->getAll();
        }else{
            $data = $this->db_manager->get($repository)
            ->getById(array("id" => $this->_id));
        }
        $this->json($data);
    }

    /**
     *
     * 追加処理
     *
     */

     public function addNewData($repository){
        $this->db_manager->get($repository)->insert($this->_data);
        $data = [];
        $data['status'] = "success";
        $this->json($data);
     }


    /**
     *
     * 更新処理
     *
     */
     public function updateData($repository){
        $this->db_manager->get($repository)->update($this->_data);
        $data = [];
        $data["status"] = 'success';
        $this->json($data);         
     }


     /**
     *
     * 削除処理
     *
     */

     /**
     *
     * 認証処理
     *
     */
    private function authUser(){
        
        $param['Password'] = md5($this->_data["password"]);
        $param['Username'] = $this->_data["username"];
        $user = $this->db_manager->get('User')->getByUsername($param);

        if($user["Password"] === $param['Password']){
            $data = [];
            $data['status'] =  'success';
            $data['token'] = $this->db_manager->get('User')->getToken();
            $data['time'] = time();
            $this->json($data);
        } else {
            $data = [];
            $data['status'] =  'false';
            $data['message'] =  'Username or password is incorrect';
            $this->json($data);
        }
     }

}
