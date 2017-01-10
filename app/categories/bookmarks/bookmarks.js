angular.module('categories.bookmarks', [
	'categories.bookmarks.create',
	'categories.bookmarks.edit',
	'models.bookmarks',
	'models.categories'
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('booky.categories.bookmarks', {
				url: 'categories/:category',
				views: {
					'bookmarks@': {
						templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
						controller: 'BookmarksCtrl as bmCtrl'
					}
				}
			})
		;
	})
	.controller('BookmarksCtrl', function BookmarksCtrl(BookmarksModel, $stateParams, CategoriesModel, $state) {
		var bmCtrl = this;

		BookmarksModel.getBookmarks()
			.then(function(bookmarks) {
				bmCtrl.bookmarks = bookmarks;
			})
		;

		CategoriesModel.setCurrentCategory($stateParams.category);

		bmCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
		bmCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
		bmCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
	})
;