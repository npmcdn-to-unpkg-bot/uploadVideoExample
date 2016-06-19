'use strict';

angular.module('demo') 
        .controller('DemoFileUploadController', [
            '$scope', '$sce', 'toastr',
            function ($scope, $sce, toastr) {
                var url = 'https://upload.wistia.com/?api_password=ac3d6c9875bf62d6ca23cb4ddbbdb3555627b9e7e169bf0f08716ebf5eab5788'
                $scope.options = {
                    url: url,
                    handleResponse: function (e, data) {
                                if(e.type=="fileuploaddone" && data._response.result){
                                  data.files[0].show_wistia_video=true
                                  data.files[0].embedded_video_src=$sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/'+data._response.result.hashed_id)
                                } else {
                                  toastr.error("upload failed", "error")
                                }
                    }
                };
                    $scope.loadingFiles = false;
            }
        ])

        .controller('FileDestroyController', [
            '$scope', '$http',
            function ($scope, $http) {
                var file = $scope.file,
                    state;
                if (file.url) {
                    file.$state = function () {
                        return state;
                    };
                    file.$destroy = function () {
                        state = 'pending';
                        return $http({
                            url: file.deleteUrl,
                            method: file.deleteType
                        }).then(
                            function () {
                                state = 'resolved';
                                $scope.clear(file);
                            },
                            function () {
                                state = 'rejected';
                            }
                        );
                    };
                } else if (!file.$cancel && !file._index) {
                    file.$cancel = function () {
                        $scope.clear(file);
                    };
                }
            }
        ]);
