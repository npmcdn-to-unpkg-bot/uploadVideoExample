'use strict';
angular.module('demo', [
    'blueimp.fileupload', 'toastr'
])
  .config([
      '$httpProvider', 'fileUploadProvider',
      function ($httpProvider, fileUploadProvider) {
      }
  ]);

