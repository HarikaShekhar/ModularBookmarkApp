angular.module('models.categories', [

])
	.service('CategoriesModel', function CategoriesModel($http, $q) {
		var model = this,
		URL = {
			FETCH: 'data/categories.json'
		},
		categories,
		currentCategory;

		function extract(result) {
			return result.data;
		}

		function cacheCategories(result) {
			categories = extract(result);
			return categories;
		}

		model.getCategories = function() {
			return (categories) ? $q.when(categories) : $http.get(URL.FETCH).then(cacheCategories);
		};

		model.setCurrentCategory = function(categoryName) {
			return model.getCategoryByName(categoryName)
				.then(function(category) {
					currentCategory = category;
					// console.log(category);
				})
		};

		model.getCurrentCategory = function () {
			return currentCategory;
		};

		model.getCurrentCategoryName = function() {
			return currentCategory ? currentCategory.name : '';
		};

		model.getCategoryByName = function(categoryName) {
			var deferred = $q.defer();

			function findCategory() {
				var fetchedCategory;

				categories.forEach(function(category) {
					if (category.name == categoryName) {
						fetchedCategory = category;
					}
				})
				return fetchedCategory;
			}

            // function findCategory(){
            //     return _.find(categories, function(c){
            //         return c.name == categoryName;
            //     })
            // }

			if (categories) {
				deferred.resolve(findCategory());
			} else {
				model.getCategories()
					.then(function() {
						deferred.resolve(findCategory());
					})
			}

			return deferred.promise;
		}
	})
;