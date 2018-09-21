<?php
/***
 * 
 * CS_JS_Loader
 * 
 * 
 ***/



class Twig_Myextension_U2date extends Twig_Extension
{
	
	
	public function __construct(){

	}
	
	public function getFilters()
	{
		return array(
			'u2date'=> new Twig_Filter_Method($this,'u2date')
		);
	}
	
	public function u2date($value,$param="Y/m/d H:i")
	{
		
		if(isset($value) && is_numeric($value)){
			return date($param,$value);
		}else{
			return date($param);
		}
		
	}
	
	public function getName()
	{
		return 'UnixTime2Date';
	}
	
}