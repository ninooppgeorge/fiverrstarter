var fs = require('fs');
var exec = require('child_process').exec;


var app = angular.module('nin', []);

app.controller('firstCtrl', function($scope, $filter){
    $scope.displaydate = $filter('date')(new Date(),'dd MMM yyyy');
    $scope.date = $filter('date')(new Date(),'yyyy_MMM_dd');
    $scope.projectname = '';
    $scope.foldername = $scope.date+'_'+$scope.projectname;

    $scope.show = false;
    $scope.showq = false;

    $scope.npm = false;
    $scope.git = false;
    $scope.folders = false;
    $scope.gulp = false;
    $scope.mydynamicclass = 'width20';

    $scope.updatefoldername = function(){
        $scope.foldername = $filter('spaceless')($scope.date+'_'+$scope.projectname);
    };

    $scope.submit = function(){
        fs.mkdir('../'+$scope.foldername,function(){
            if($scope.npm == true){
                npm();
            }
            if($scope.folders == true){
                folders();
            }
            if($scope.gulp == true){
                gulp();
            }
            if($scope.git == true){
                git();
            }
        });
    };

    function folders(){
        fs.mkdir('../'+$scope.foldername+'/css',function(){
        });
        fs.mkdir('../'+$scope.foldername+'/img',function(){
        });
        fs.mkdir('../'+$scope.foldername+'/js',function(){
        });
        fs.mkdir('../'+$scope.foldername+'/fonts',function(){
        });
    }
    function npm(){
        fs.writeFile('../'+$scope.foldername+'/package.json', '{\n  "name": "'+$scope.projectname+'",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "author": "",\n  "license": "ISC"\n}', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
    function git(){
        execute('cd ../'+$scope.foldername+' && git init', function(output) {
            console.log(output);
        });
    }
    function gulp(){
        fs.mkdir('../'+$scope.foldername+'/sass',function(){
            console.log('success');
            $scope.show = true;
            execute('cd ../'+$scope.foldername+' && npm install --save gulp', function(output) {
                console.log(output);
                $scope.mydynamicclass = 'width50';
                execute('cd ../'+$scope.foldername+' && npm install --save gulp-connect', function(output) {
                    console.log(output);
                    $scope.mydynamicclass = 'width75';
                    execute('cd ../'+$scope.foldername+' && npm install --save gulp-sass', function(output) {
                        console.log(output);
                        $scope.mydynamicclass = 'width100';
                        $scope.showq = true;
                    });
                });
            });
        });
    }
    function execute(command, callback){
        exec(command, function(error, stdout, stderr){ callback(stdout); });
    };
    

});

app.filter('spaceless',function() {
    return function(input) {
        if (input) {
            return input.replace(/\s+/g, '_');    
        }
    }
});