angular.module('categories', [
	'models.categories'
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('booky.categories', {
				url: '/',
				views: {
					'categories@': {
						templateUrl: 'app/categories/categories.tmpl.html',
						controller: 'CategoriesCtrl as cgCtrl'
					},
					'bookmarks@': {
						templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
						controller: 'BookmarksCtrl as bmCtrl'
					}
				}
			})
		;
	})
	.controller('CategoriesCtrl', function CategoriesCtrl(CategoriesModel) {
		var cgCtrl = this;
		CategoriesModel.getCategories()
			.then(function(categories) {
				cgCtrl.categories = categories;
			})
		;

	})
;