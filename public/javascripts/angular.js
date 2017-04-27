var app = angular.module('login', []); //모듈명, injection할 모듈명


app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    //scope? 컨트롤러와 뷰 사이에 공통으로 사용되는 변수가 된다.
    $scope.title = 'TitleFromAngular';
    $scope.isLoginMode = true;

    $scope.show = function (inputed) {
        switch (inputed) {
            case 'login':
                $scope.result = "로그인은 훼이크고 입력값은 " + $scope.inputID + " 와 " + $scope.inputPW;
                break;
            case 'regist':
                $scope.result = "미지원입니다.";
                break;
            default:
                $scope.result = '';
                break;
        }
    };

    $scope.login = function () {
        $http({
                method: 'POST',
                url: '/auth/login',
                data: {
                    id: $scope.inputID,
                    pw: $scope.inputPW
                },
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
            .then(function success(response) {
                if (response.data.result) {
                    $http.get('/main');
                } else{
                    //json success
                $scope.result = response.data.response;
                }
            }, function error() {
                $scope.result = 'inServer error!';
            });
    };
}]);