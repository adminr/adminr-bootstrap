var mod = angular.module('adminr-core-test',['adminr-bootstrap','treasure-overlay-spinner']);

mod.config(function(AdminrDataSourcesProvider){
    var datasource = AdminrDataSourcesProvider.createDataSource('Test','https://adminr-test-api.herokuapp.com',{supportsRangeHeader:true})
    datasource.addResource('Me','/me')
    datasource.addResource('User','/users/:id',{id:'@id'})
})

mod.run(function($rootScope,$location){
    $rootScope.page = $location.path().replace('/','') || 'forms'
})

mod.controller('TestCtrl',function($scope,AdminrDataSources,$location){
    $scope.datasource = AdminrDataSources.getDataSource('Test')
    $scope.users = $scope.datasource.getResource('User').query()
    $scope.user = $scope.datasource.getResource('User').create()

    $scope.saveUser = function(){
        $scope.user.$save().then(function(){
            //$scope.user = $scope.datasource.getResource('User').create()
        })
    }
})