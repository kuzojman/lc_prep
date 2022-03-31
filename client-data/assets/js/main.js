$(".left-card").on("click", function () {
	var list = $(this).siblings(".left-card-list-parent");
	if (!list.hasClass("active")) {
		$(".left-card").removeClass("active");
		$(".left-card-list-parent").removeClass("active");
	}
	$(this).toggleClass("active");
	list.toggleClass("active");
});

$(".checked-test").on("click", function (event) {
	$("#tests-modal").modal("show");
});

$(".comments-toggle-link").on("click", function () {
	var list = $(this).closest(".comments-parent").find(".comments-toggle-list");
	list.toggleClass("active");
});

$(".question-card").on("click", function () {
	console.log($(this).find(".question-answer"));
	const list = $(this).find(".question-answer");
	if (!list.hasClass("active")) {
		$(".question-answer").removeClass("active");
	}
	list.toggleClass("active");
});

$(".left-card-link").on("click", function () {
	$(".left-card-link").removeClass("active");
	$(this).toggleClass("active");
});

$(".left-card_themes").on("click", function () {
	$(".left-card_themes").removeClass("active");
	$(this).toggleClass("active");
});

$(".filter-link").on("click", function () {
	$(".filter-link").removeClass("active");
	$(this).toggleClass("active");

	$(".filter-block").css("display", "none");
	$("." + $(this).attr("data-widget")).css("display", "block");
});

$(".left-card_themes-title2").on("click", function () {
	$(this).toggleClass("active");
	$(this).next().toggleClass("active");
});

$(".left-card_themes-title3").on("click", function () {
	$(this).toggleClass("active");
	$(this).next().toggleClass("active");
});
