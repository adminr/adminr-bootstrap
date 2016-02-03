var mod = angular.module('adminr-core-test',['adminr-bootstrap']);

mod.config(function(AdminrDataSourcesProvider){
    var datasource = AdminrDataSourcesProvider.createDataSource('Test','https://adminr-test-api.herokuapp.com',{supportsRangeHeader:true})
    datasource.addResource('Me','/me')
    datasource.addResource('User','/users/:id',{id:'@id'})
})

mod.controller('TestCtrl',function($scope,AdminrDataSources,$location){
    $scope.page = $location.path().replace('/','')
    $scope.datasource = AdminrDataSources.getDataSource('Test')
    $scope.users = $scope.datasource.getResource('User').query()
    $scope.user = $scope.datasource.getResource('User').create()
})