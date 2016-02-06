var mod = angular.module('adminr-core-test',['adminr-bootstrap','treasure-overlay-spinner']);

mod.config(function(AdminrDataSourcesProvider){
    var datasource = AdminrDataSourcesProvider.createDataSource('Test','https://adminr-test-api.herokuapp.com',{supportsRangeHeader:true})
    datasource.addResource('Me','/me')
    datasource.addResource('User','/users/:id',{id:'@id'})
})

mod.controller('TestCtrl',function($scope,AdminrDataSources,$location){
    $scope.page = $location.path().replace('/','') || 'forms'
    $scope.datasource = AdminrDataSources.getDataSource('Test')
    $scope.users = $scope.datasource.getResource('User').query()
    $scope.user = $scope.datasource.getResource('User').create()

    $scope.saveUser = function(){
        $scope.user.$save().then(function(){
            //$scope.user = $scope.datasource.getResource('User').create()
        })
    }
})

mod.controller('ModalTest',function($scope,$uibModal){
    $scope.open = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            template:'hello this is modal',
            //templateUrl: 'myModalContent.html',
            //controller: 'ModalInstanceCtrl',
            size: 'lg',
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });
    }
})