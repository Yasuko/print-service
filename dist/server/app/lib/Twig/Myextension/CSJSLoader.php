<?php
/***
 * 
 * CS_JS_Loader
 * 
 * 
 ***/



class Twig_Myextension_CSJSLoader extends Twig_Extension
{
	
	protected $Path;
	
	public function __construct($pass){
		$this->Path = $pass;
	}
	
	public function getFunctions()
	{
		return array(
			'asset'=> new Twig_Function_Method($this,'asset')
		);
	}
	
	public function asset($value)
	{
		return $this->Path.$value;
	}
	
	public function getName()
	{
		return 'cjiFilter';
	}
	
}