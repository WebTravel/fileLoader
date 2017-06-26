; (function ($, window, document) {

// стандартные значения
var defaults = {
 'addButtonText' : 'Выберите файлы', // текст кнопки добавления файлов
 'deleteButtonText' : 'Удалить все файлы', // текст кнопки удаления файлов
  'extensionText' : 'Допустимое расширение файлов:', // текст предупреждения допустимых расширений файла
  'dropText' : 'Перенесите файлы мышью',//текст кнопки ниже
 'check' : true, // проверка на дублирование файлов
 'validate' : ''
}

function FileLoader(element, options) {
  this.options = $.extend({}, defaults, options);
  this.element = element;
  this.init();
}

// вызов функции инициализации
FileLoader.prototype.init = function () {

  // список переменных
  var self = this,
      element = this.element,
      finalFiles = [],
      inputText = '<input type="file" id="fileLoader__input" class="form__upload--file" name="files" multiple>',
      addFileButton = '<button class="form__upload--button" id="fileLoader__add">'+ self.options.addButtonText +'</button>',
      removeAllFilesButton = '<button class="form__upload--button" id="fileLoader__delete">'+ self.options.deleteButtonText +'</button>',
      removeFile = '<span class="fileLoad__remove">&#9746;</span>',
      resultListWrapper = '<div class="fileLoader__result--list"></div>',
      dropTitle='<div class="fileLoader__title">'+ self.options.dropText +'</div>'
      form = '<form action="" id="fileLoader" class="fileLoader"><div class="form__upload" id="dropzone">' + inputText + addFileButton + dropTitle + '</div></form>',
      extSel = '<div class="fileLoad__extension">'+ self.options.extensionText+' ' + self.options.validate + '</div>',

  // добавляем форму внутрь селектора, к которому применяется плагин
  element.append(form);
  if(self.options.validate !== '') {
    element.append(extSel);
  }
  element.append(resultListWrapper);

  //Обрабатываем drag&drop загрузку
  $('#dropzone')

  // Получаем список файлов, и переносим их в массив, выводим визуальное отображение
  $('#fileLoader__input').on('change', function(e) {
    var files = this.files; // получаем файлы
    $.each(files,function(idx, elm){ // проходим в цикле по файлам
      var its_new_file = true; // создаем переменную, чтобы представить, что файл новый

      //Проверка файлов на расширение
      if(self.options.validate !== '') {//если графа валидации не пустая
        var filesExt = self.options.validate.split(','), // массив расширений
            elmArr = elm.name.split('.'),//массив с файлами
            ext = elmArr[elmArr.length - 1];//расширение файла
        for(var i = 0; i < filesExt.length; i++) {
          if(ext == filesExt[i]) { //сравниеваем расширение с элементами массива
            its_new_file = true;
            break;
          } else {
            its_new_file = false;
          }
        }
      }

      //Проверка файла по имени и размеру
      if (self.options.check === true) { // если пользователь хочет проверять файлы на дубликаты
        $.each(finalFiles,function(idxInner, elmInner){ // проходим по массиву файлов, добавленных ранее
          if (elmInner.size == elm.size && elmInner.name == elm.name) { // если размер и имя равны
            its_new_file = false; // это не новый файл
            return true; // переходим на следующую итерацию
          }
        });
      }

      //Формируем итоговый список файлов
      if (its_new_file) { // если файл новый
        finalFiles.push(elm); // добавляем его в массив
        // Ниже выводим визуальный список файлов
        var list = files[idx].name;
        $('.fileLoader__result--list').append('<div class="fileLoad__result--item">' + list + removeFile + '</div>');
        if($('#fileLoader__delete').length == 0) {
          $('#fileLoader__add').after(removeAllFilesButton);
        }
      }

    });
    //console.log(finalFiles);
  });

  // Удаление всех файлов по нажатию на кнопку
  $('#fileLoader__delete').on('click', function() {
    $(this).remove();
    finalFiles = [];
    $('.fileLoader__result--list').empty();
  });

  // Удаление отдельного файла из списка
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