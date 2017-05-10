; (function ($, window, document) {

//defaults value
var defaults = {
 'addButtonText' : 'Выберите файлы',
 'deleteButtonText' : 'Удалить все файлы'
}

function FileLoader(element, options) {
  this.options = $.extend({}, defaults, options);
  this.element = element;
  this.init();
}

//call init function
FileLoader.prototype.init = function () {

  //Variable-list
  var self = this,
      element = this.element,
      inputText = '<input type="file" id="fileLoader__input" class="form__upload--file" name="files" multiple>',
      addFileButton = '<button class="form__upload--button" id="fileLoader__add">'+ self.options.addButtonText +'</button>',
      resultListWrapper = '<div class="fileLoader__result--wrapper"></div>',
      form = '<form action="" id="fileLoader" class="fileLoader"><div class="form__upload">' + inputText + addFileButton + '</div></form>';

  //add Form inner selector
  element.append(form + resultListWrapper);

  //Get file-list
  $('#fileLoader__input').on('change', function(e) {

    var files = this.files,
        len = files.length,
        finalFiles = {},
        removeFile = '<span class="fileLoad__remove">&#9746;</span>',
        removeAllFilesButton = '<button class="form__upload--button" id="fileLoader__delete">'+ self.options.deleteButtonText +'</button>';

    //Move file-list in object
    $.each(files,function(idx, elm){
      finalFiles[idx] = elm;
    });

    //Create "delete-all-files button"
    if(!$.isEmptyObject(finalFiles)) {
      $('#fileLoader__add').after(removeAllFilesButton);
    }

    //Delete all files on click "delete-all-files button"
    $('#fileLoader__delete').on('click', function() {
      $(this).detach();
      finalFiles = {};
      $('.fileLoader__result--wrapper').empty();
      console.log(finalFiles);
    });


    //Create visual file-list for user
    for (var i = 0; i < len; i++) { 
      var list = finalFiles[i].name;
      $('.fileLoader__result--wrapper').append('<div class="fileLoad__result--list" id="'+ 'fileItem' + i +'">' + list + removeFile + '</div>');
    }

    //Delete file from file-list
    $('.fileLoad__remove').on('click', function() {
      var fileId = $(this).parent().attr('id'),
        num = fileId.slice(8, fileId.length);
        
      if(finalFiles[num].length != 0) {
        $(this).parent().detach();
        delete finalFiles[num];
      }
      
      if($.isEmptyObject(finalFiles)) {
        if($('#fileLoader__delete').length > 0) {
          $('#fileLoader__delete').detach();
        }
      }
      console.log(finalFiles);
    });
 
  });

};

$.fn.fileLoader = function (options) {
  new FileLoader(this, options);
  return this;
};


})(jQuery, window, document);



//Call Plugin
$('.form__wrapper').fileLoader({
  'addButtonText' : 'Добавить файлы'
}).addClass('les');