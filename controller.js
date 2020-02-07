angular.module("miPrimeraApp", [])
	.controller("primerController", function($scope, $http) {
		$scope.newLibro = {};
		$scope.actual = {};

		$scope.detect = function() {
			switch ($scope.operacion) {
				case $scope.operacion = "add":
					$scope.addlibro();
					break;
				case $scope.operacion = "editar":
					$scope.editlibro(index);
					break;
				default:
					// code block
			}

		}
		$scope.filtrarFecha = function() {
			$scope.libros.forEach(e => e.Invalidate = eval('new ' + e.Invalidate.replace(/\//g, '')));

		};
		$http.get("https://smvdatabasep2001874259trial.hanatrial.ondemand.com/comfamaHana/services/servicio.xsodata/library?$format=json")
			.then(function(datos) {

					$scope.libros = datos.data.d.results;
					$scope.filtrarFecha();

					$(document).ready(function() {
						$('#table_id').DataTable();
					});

				},
				function(error) {

				}
		);

		$scope.addlibro = function() {
			$http.post("https://smvdatabasep2001874259trial.hanatrial.ondemand.com/comfamaHana/services/servicio.xsodata/library", {
				ID: $scope.newLibro.ID,
				Libro_Nombre: $scope.newLibro.Libro_Nombre,
				categoria: $scope.newLibro.categoria,
				Invalidate: "/Date(" + new Date($scope.newLibro.Invalidate).getTime() + ")/"

			})
				.then(function(data, status, headers, config) {
					$scope.libros.push($scope.newLibro);
					$scope.newLibro = {};

				}, function(error, status, headers, config) {

				});

		};
		//$scope. $apply();
		$scope.deletelibro = function(index) {
			$scope.url = "https://smvdatabasep2001874259trial.hanatrial.ondemand.com/comfamaHana/services/servicio.xsodata/library(" + $scope.libros[
				index].ID + ")";
			$http.delete($scope.url)
				.then(function(data, status, headers, config) {

					$scope.libros = $scope.libros.filter(function(libro) {
						return libro.ID != $scope.libros[index].ID
					});

					alert("libro eliminado exitosamente");

				}, function(error, status, headers, config) {
					alert("error al eliminar");
				});

		};
		$scope.editlibro = function(libro) {
			$scope.isbn = libro.ID;
			$scope.nombre = libro.Libro_Nombre;
			$scope.categoria = libro.categoria;
			$scope.fecha = "/Date(" + new Date(libro.Invalidate).getTime() + ")/";

			$scope.url = "https://smvdatabasep2001874259trial.hanatrial.ondemand.com/comfamaHana/services/servicio.xsodata/library(" + $scope.isbn +
				")";
			$http.put($scope.url, {
				ID: $scope.isbn,
				Libro_Nombre: $scope.nombre,
				categoria: $scope.categoria,
				Invalidate: $scope.fecha

			})
				.then(function(data, status, headers, config) {

					alert("libro editado exitosamente");
					$scope.newLibro = {};
				}, function(error, status, headers, config) {
					alert("error al editar");
				});

		};

		$scope.milibro = function(libro) {
			$scope.actual = libro;
			$scope.isbn = libro.ID;
			$scope.nombre = libro.Libro_Nombre;
			$scope.categoria = libro.categoria;
			$scope.fecha = libro.Invalidate;

		};

	});