<?php

/**
 * FormBuilder.
 *
 */

abstract class FormBuilder
{
    protected $Tags = array(
    		"select" => array('<option ','>','</oprion>',' SELECTED '),
    		"radio" => array('<input type="radio" ','>','',' CHECKED '),
    		"checkbox" => array('<input type="checkbox" ','>','',' CHECKED '),
    		);
    
	protected $FormMap = Array();
	protected $FormData = Array();
	protected $Checked;
	
    /**
     * コンストラクタ
     *
     * @param string $base_dir
     * @param array $defaults
     */
    public function __construct()
    {

    }

    
    /**
     *
     * フォーム作成
     *
     * @param string $options
     */
    public function buildForm($options = array())
    {
    	
    	
    	foreach($this->FormMap as $MapKey => $MapData){
    		
    		$FORM = "";
    		
    		if(isset($this->FormData[$MapKey])){
    			
    			foreach ($MapData["content"] as $ContentKey => $ContentData){
    				
    				$FORM .= $this->Tags[$MapData["tags"]][0].
    						" id='post_".$MapKey."' ".
    						" name='".$MapKey."' ".
    						" value='".$ContentKey."' ";
    				
    				if(isset($options[$MapKey])){
    					$FORM .= $options;
    				}

    				if($this->FormData[$MapKey] == $ContentKey){
    					$FORM .= $this->Tags[$MapData["tags"]][3]. 
    					$this->Tags[$MapData["tags"]][1].
    					$ContentData.
    					$this->Tags[$MapData["tags"]][2];
    					
    				}else{
    					$FORM .= $this->Tags[$MapData["tags"]][1].
    					$ContentData.
    					$this->Tags[$MapData["tags"]][2];
    					
    				}
    			}
    			
    			$this->FormData[$MapKey] = $FORM;
    		}
    	}
    }
}
