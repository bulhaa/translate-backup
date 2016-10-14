var definitions;
var manager = angular.module('manager', [])
  .controller('managerController', function($scope) {
    definitions = this;
    definitions.definition = [
      /* {eText:'cat', dText:'ބުޅާ', type:12} */
	]
	
/*    $scope.testValue = 0;
   setInterval(function() {
        console.log($scope.testValue++);
			$('select').material_select();
        $scope.$apply() 
    }, 500); */
	


	
	$(document).delegate('form', 'submit', function(event) {
		var $form = $(this);
		var id = $form.attr('id');
		var data = $form.serialize();
		// eTextValue=$("#eText"+(a)).val();
		var data = $(id).serialize();
		eTextValue=$form[0][0].value;
		dTextValue=$form[0][1].value;
		typeValue=$form[0][3].value;
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/SetDefinitionO",
		{
			eText: eTextValue,
			dText: dTextValue,
			type: typeValue
		}
		,
		function(data){
			$("#feedback").html(data.childNodes[0].childNodes[0].data);
			$("#feedback").show();
		});
		return false;
	});
	
	
	$("#setRule").click(function(){
		positions = $('.position');
		var Order = "";
		var Pattern = "";
		// for(var a=positions.length-1; a>-1; a--){
		for(var a=0; a<positions.length; a++){
			// var d = 
			Pattern += ''.concat(definitions.definition[a].type, ' ');
			if($(positions[positions.length-a-1]).find('.draggable').length>0){
				var i = $(positions[positions.length-a-1]).find('.draggable')[0].id;
				i = i.replace('word', '');
				i = positions.length-i;
				//((int)i)+1
				Order += ''.concat(i, ' ');
			}
			

		}
		
		var ruleValue = Pattern.concat('0 ', Order);
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/setRuleO",
		{
			eText: ruleValue
		}
		,
		function(data){
			$("#feedback").html(data.childNodes[0].childNodes[0].data);
			$("#feedback").show();
		});
	});

	$("#setRuleWithAI").click(function(){
		positions = $('.position');
		var Order = "";
		var Pattern = "";
		// for(var a=positions.length-1; a>-1; a--){
		for(var a=0; a<positions.length; a++){
			// var d = 
			Pattern += ''.concat(definitions.definition[a].type, ' ');
			if($(positions[positions.length-a-1]).find('.draggable').length>0){
				var i = $(positions[positions.length-a-1]).find('.draggable')[0].id;
				i = i.replace('word', '');
				i = positions.length-i;
				//((int)i)+1
				Order += ''.concat(i, ' ');
			}
			

		}
		
		var ruleValue = Pattern.concat('0 ', Order);
		eTextValue=$("#sent_eText").val();
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/setRuleWithAIO",
		{
			rule: ruleValue,
			definition: eTextValue
		}
		,
		function(data){
			$("#feedback").html(data.childNodes[0].childNodes[0].data);
			$("#feedback").show();
		});
	});

	$("#sentForm").submit(function(){
		if($('#sentForm .progress').is(':visible'))
			return false;
		
	eTextValue=$("#sent_eText").val();
		$('#sentForm .progress').show();
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/getDefinitionsO",
		{
			dText: eTextValue,
			eText: eTextValue
		}
		,
		function(data){
			$( ".draggable" ).remove();
			var dArr = data.childNodes[0];
				definitions.definition = [];
			for(var a=0; a<dArr.childElementCount; a++){
				var d = dArr.childNodes[a];
				var eText = d.childNodes[0].childNodes[0].data;
				var dText;
				var type = d.childNodes[2].childNodes[0].data;
				if(d.childNodes[1].childNodes[0]!=null)
					dText = d.childNodes[1].childNodes[0].data;
				else
					dText = "";
				// definitions.definition.push({eText:eText, dText:dText, type:type});
				definitions.addDefinition(eText, dText, type);
				// definitions.addDefinition();
				$scope.$apply() 
				$('select').material_select();
				// $('#form'+(a+1)).show();
				// $('#eText'+(a+1)).val(d.childNodes[0].childNodes[0].data);
				$('#eText'+(a)).addClass("valid");
				$('#eTextl'+(a)).addClass("active");
				if(d.childNodes[1].childNodes[0]!=null){
					$('#dTextl'+(a)).addClass("active");
					$('#dText'+(a)).addClass("valid");
				}else
					$('#dText'+(a)).addClass("invalid");
				
				$('#dText'+(a)).addClass("dv");
				
				// thaanaKeyboard.setHandlerById('dText'+(a),"enable");
					
				$('#type'+(a)).val(d.childNodes[2].childNodes[0].data);
				if(d.childNodes[2].childNodes[0].data == 2147483647){
					$('#type'+(a)).addClass("invalid");
					$('#type'+(a)).val("");
				}
				$('#type'+(a)).material_select();
				$('#form'+(a)).show();
			}
			$('.droppable').show();
			$('#setRuleWithAI').show();
			$('#setRule').show();
			$( ".draggable" ).draggable({
			  appendTo: "body",
			  helper: "clone"
			});
			$( ".droppable" ).droppable({
			  activeClass: "ui-state-default",
			  hoverClass: "ui-state-hover",
			  accept: ":not(.ui-sortable-helper)",
			  drop: function( event, ui ) {
				// $( this ).find( ".placeholder" ).remove();
				// $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
				$( ui.draggable).appendTo( this );
			  },
/* 			  out: function( event, ui ) {
				$( this )
				  .remove
			  } */
			}).sortable({
			  items: "li:not(.placeholder)",
			  sort: function() {
				// gets added unintentionally by droppable interacting with sortable
				// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
				$( this ).removeClass( "ui-state-default" );
			  }
			});
			/* 		$( ".position" ).droppable({
 			  drop: function( event, ui ) {
				$( this )
				  .addClass( "ui-state-highlight" );
			  },
			  out: function( event, ui ) {
				$( this )
				  .removeClass( "ui-state-highlight" );
			  }
			}); */
			$('#sentForm .progress').hide();
			$('#Arrange-banner').show();
			//$('.dText').thaana();
			
			//var caretPos = 0;
            $('.dText').bind('input', function() {
			// $('.dText').on('input', function() {
					//$(this).change();
				  // $(this)[0].value = 'test';
				  var c = $(this).caret().start;
				  var s = $(this)[0].value;
				  var o = s;
				  
				  s = s.replace('q', 'ް');
				  s = s.replace('w', 'އ');
				  s = s.replace('e', 'ެ');
				  s = s.replace('r', 'ރ');
				  s = s.replace('t', 'ތ');
				  s = s.replace('y', 'ޔ');
				  s = s.replace('u', 'ު');
				  s = s.replace('i', 'ި');
				  s = s.replace('o', 'ޮ');
				  s = s.replace('p', 'ޕ');
				  s = s.replace('a', 'ަ');
				  s = s.replace('s', 'ސ');
				  s = s.replace('d', 'ދ');
				  s = s.replace('f', 'ފ');
				  s = s.replace('g', 'ގ');
				  s = s.replace('h', 'ހ');
				  s = s.replace('j', 'ޖ');
				  s = s.replace('k', 'ކ');
				  s = s.replace('l', 'ލ');
				  s = s.replace('z', 'ޒ');
				  s = s.replace('x', '×');
				  s = s.replace('c', 'ޗ');
				  s = s.replace('v', 'ވ');
				  s = s.replace('b', 'ބ');
				  s = s.replace('n', 'ނ');
				  s = s.replace('m', 'މ');
				  s = s.replace('Q', 'ޤ');
				  s = s.replace('W', 'ޢ');
				  s = s.replace('E', 'ޭ');
				  s = s.replace('R', 'ޜ');
				  s = s.replace('T', 'ޓ');
				  s = s.replace('Y', 'ޠ');
				  s = s.replace('U', 'ޫ');
				  s = s.replace('I', 'ީ');
				  s = s.replace('O', 'ޯ');
				  s = s.replace('P', '÷');
				  s = s.replace('A', 'ާ');
				  s = s.replace('S', 'ށ');
				  s = s.replace('D', 'ޑ');
				  s = s.replace('F', 'ﷲ');
				  s = s.replace('G', 'ޣ');
				  s = s.replace('H', 'ޙ');
				  s = s.replace('J', 'ޛ');
				  s = s.replace('K', 'ޚ');
				  s = s.replace('L', 'ޅ');
				  s = s.replace('Z', 'ޡ');
				  s = s.replace('X', 'ޘ');
				  s = s.replace('C', 'ޝ');
				  s = s.replace('V', 'ޥ');
				  s = s.replace('B', 'ޞ');
				  s = s.replace('N', 'ޏ');
				  s = s.replace('M', 'ޟ');
  
				  if(o!=s){
					$(this)[0].value = s;
					$(this).change();
					var a=0;
					if(!$(this).attr('lastText'))
						$(this).attr('lastText', "");
					
					for(; a<$(this).attr('lastText').length && a<$(this).val().length; a++){
						if($(this).attr('lastText').charAt(a).match($(this).val().charAt(a))==null)
							break;
					}
					a++;
					if(a==0)
						a=c+1;
					 // alert(''.concat(c, ' ',$(this).val().length, ' ', a, $(this).val().charAt(c-1)));
					 // alert(''.concat(c, ' ',$(this).val().length, ' ', a, ' '));
					
					//if(c!=0 && $(this).val().length>2)
					//if((c!=0 && !$(this).val().charAt(c-1).match("\\s")) || c+1 == $(this).val().length)
					//if((c==0 || (!$(this).val().charAt(c-1).match("\\s")) || c+1 == $(this).val().length))
					if($(this).attr('lastChar') != $(this).val().charAt($(this).val().length-1))
					//if(!$(this).attr('lastChar').match($(this).val().charAt($(this).val().length-1)))
						$(this).caret($(this).val().length, $(this).val().length);
					else if(c==0)
						$(this).caret(a,a);
					else if($(this).val().charAt(c-1).match("\\s"))
						$(this).caret(c+1,c+1);
					else
						$(this).caret(c,c);
						//$(this).caret(caretPos,caretPos);
				  }
				  $(this).attr('lastChar', $(this).val().charAt($(this).val().length-1));
				  $(this).attr('lastText', $(this).val());
                //caretPos = $(this).caret().start;
			});
			//$('.dText').thaana();
            $('.dText').keydown(function() {
                caretPos = $(this).caret().start;
            }).keyup(function() {
                caretPos = $(this).caret().start;
            });
			// $(".dText").change(function() {
				  // alert( "Handler for .change() called.".concat($(this)[0].value) );
				  
				// });	
// $('input[name=myInput]').change(function() {
	  // alert( "Handler for .change() called." );
// });


	// $(".dText").bind("change", function() {    
		// $(this).value = $(this).value;
	// });

		});

		return false;
	});
				
	// dictionary.$bindTo($scope, "data"); 
 
     definitions.addDefinition = function(e, d, t) {
      definitions.definition.push({eText:e, dText:d, type:t});
	  
		};

/* 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    }; */
  });
  
	manager.filter('reverse', function() {
		  return function(items) {
			return items.slice().reverse();
		  };  
	});
	

		 
		  
angular.module('staticSelect', [])
 .controller('ExampleController', ['$scope', function($scope) {
   $scope.data = {
    singleSelect: null,
    multipleSelect: [],
    option1: 'option-1',
   };

   $scope.forceUnknownOption = function() {
     $scope.data.singleSelect = 'nonsense';
   };
}]);