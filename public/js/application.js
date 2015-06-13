$( document ).ready(function() {
    console.log( "ready!" );
    //$( 'textarea#editor1' ).ckeditor();
    
    $('#dialog').dialog({ 
    	modal: true, 
    	autoOpen: false,
    	height: 600,
    	width: 1000,
    	position: { my: "left top", at: "left top" }
    });

    
});

function preview() {
    $('#dialog').html($('#mytext').val());
    $('#dialog').dialog('open');
}