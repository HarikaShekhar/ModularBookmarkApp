angular.module('Booky', [
	'ui.router',
	'categories',
	'categories.bookmarks'
])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('booky', {
				url: '',
				abstract: true
			})
		;
		$urlRouterProvider.otherwise('/');
	})
;