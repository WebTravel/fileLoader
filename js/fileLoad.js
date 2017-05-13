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
      removeAllFilesButton = '<button class="form__upload--button" id="fileLoader__delete">'+ self.options.deleteButtonText +'</button>',
      removeFile = '<span class="fileLoad__remove">&#9746;</span>',
      resultListWrapper = '<div class="fileLoader__result--list"></div>',
      finalFiles = [],
      form = '<form action="" id="fileLoader" class="fileLoader"><div class="form__upload">' + inputText + addFileButton + '</div></form>';

  //add Form inner selector
  element.append(form + resultListWrapper);

  //Get file-list
  $('#fileLoader__input').on('change', function(e) {
    var files = this.files;
    //Move file-list in object, create visual file liast and delete files button
    $.each(files,function(idx, elm){
      finalFiles.push(elm);
      var list = files[idx].name;
      $('.fileLoader__result--list').append('<div class="fileLoad__result--item">' + list + removeFile + '</div>');
      console.log(list);
      if($('#fileLoader__delete').length == 0) {
        $('#fileLoader__add').after(removeAllFilesButton);
      }
    });
    console.log(finalFiles);
  });

  //Delete all files on click "delete-all-files button"
  $('#fileLoader__delete').on('click', function() {
    $(this).remove();
    finalFiles = [];
    $('.fileLoader__result--list').empty();
  });

  //Delete file from file-list
  $(document).on('click', '.fileLoad__remove', function() {
    var parentElem = $(this).parent('.fileLoad__result--item'),
        parentElemInd = parentElem.index();
    finalFiles.splice(parentElemInd, 1); //в скобках указаны параметры(индекс элемента в массиве, количество файлов)
    parentElem.remove();
    console.log(finalFiles);
    
    if(finalFiles.length == 0) {
      $('#fileLoader__delete').remove();
    }
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