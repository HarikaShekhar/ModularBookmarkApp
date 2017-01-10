angular.module('categories.bookmarks.create', [

])
	.config(function config($stateProvider) {
		$stateProvider
			.state('booky.categories.bookmarks.create', {
				url: '/bookmarks/create',
				templateUrl: 'app/categories/bookmarks/create/bookmark-create.tmpl.html',
				controller: 'BookmarkCreateCtrl as bmCreateCtrl'
			})
	})
	.controller('BookmarkCreateCtrl', function BookmarkCreateCtrl($state, $stateParams, BookmarksModel) {
		var bmCreateCtrl = this;

		function returnToBookmarks() {
			$state.go('booky.categories.bookmarks',{
				category: $stateParams.category
			})
		}

		function cancelCreating() {
			returnToBookmarks();
		}

		function createBookmark(bookmark) {
			BookmarksModel.createBookmark(bookmark);
			returnToBookmarks();
		}

		function resetForm() {
			bmCreateCtrl.newBookmark = {
				url: '',
				title: '',
				category: $stateParams.category
			}
		}

		bmCreateCtrl.createBookmark = createBookmark;
		bmCreateCtrl.cancelCreating = cancelCreating;

		resetForm();
	})
;