
(function() {
    'use strict';

    angular.module('frontend.admin.consumers', [
        'angular.chips',
        'frontend.admin.consumers.groups'
    ]);

    // Module configuration
    angular.module('frontend.admin.consumers')
        .config([
            '$stateProvider',
            function config($stateProvider) {
                $stateProvider
                    .state('admin.consumers', {
                        url: '/consumers',
                        data : {
                            pageName : "Consumers",
                            displayName : "consumers",
                            prefix : '<i class="material-icons text-success">perm_identity</i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: '/frontend/admin/consumers/index.html',
                                controller: 'ConsumersController',
                                resolve : {
                                    _consumers : [
                                        'ConsumerService',function(ConsumerService){
                                            return ConsumerService.query()
                                        }
                                    ]
                                }
                            }
                        }
                    })
                    .state('admin.consumers.edit', {
                        url: '/:id/edit',
                        data : {
                            pageName : "Edit Consumer",
                            displayName : "edit",
                            prefix : '<i class="material-icons text-success">perm_identity</i>'
                        },
                        views: {
                            'content@': {
                                templateUrl: '/frontend/admin/consumers/edit-consumer.html',
                                controller: 'EditConsumerController',
                                resolve : {
                                    _consumer : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.findById($stateParams.id)
                                        }
                                    ],
                                    _groups : [
                                        'KongGroupModel',
                                        function(KongGroupModel){
                                            return KongGroupModel.fetch()
                                        }
                                    ],
                                    _acls : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.fetchAcls($stateParams.id)
                                        }
                                    ],
                                    _keys : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.fetchKeys($stateParams.id)
                                        }
                                    ],
                                    _jwts : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.fetchJWTs($stateParams.id)
                                        }
                                    ],
                                    _basic_auth_credentials : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.fetchBasicAuthCredentials($stateParams.id)
                                        }
                                    ],
                                    _hmac_auth_credentials : [
                                        'ConsumerService',
                                        '$stateParams',
                                        function(ConsumerService,$stateParams){
                                            return ConsumerService.fetchHMACAuthCredentials($stateParams.id)
                                        }
                                    ]
                                }
                            }
                        }
                    })
            }
        ])
    ;
}());
