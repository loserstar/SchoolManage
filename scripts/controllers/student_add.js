angular.module('sbAdminApp')
.controller('studentAddCtrl',
function ($scope, $http, $state, $timeout, Restangular) {
  $scope.login().then(function (){
  $scope.school = $scope.currentUser.$related.school;
  //$scope.majors = Restangular.all('schools/'+$scope.school.$id.toString()+'/majors').getList().$object;
  var original;
  return $scope.user = {
      $type: "student",
      $relationships: {
        school: {data:$scope.school.$asLink()},
      },
      username: "",
      password: "",
      email: "",
      code: "",
      gender:"",
      truename: "",
      department: "",
      title: "",
      phone: "",
      credit: "",
      level: "",
      address: "",
      newgender:""
  },
  $scope.showInfoOnSubmit = !1,
  original = angular.copy($scope.user),
  $scope.revert = function() {
      return $scope.user = angular.copy(original),
      $scope.form_signin.$setPristine()
  },
  $scope.canRevert = function() {
      return ! angular.equals($scope.user, original) || !$scope.form_signin.$pristine
  },
  $scope.canSubmit = function() {
      return $scope.form_signin.$valid && !angular.equals($scope.user, original)
  },
  $scope.submitForm = function() {
    console.log($scope.user);
    if($scope.user.newgender == '男')
      $scope.user.gender = 1;
    else
      $scope.user.gender = 2;
    Restangular.all('students').post($scope.user).then(function (question) {
          alert("新增学生成功");
          return $scope.showInfoOnSubmit = !0,
          $scope.revert();
        });
    };
  });
});