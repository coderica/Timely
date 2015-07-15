"use strict";

var bgpage = chrome.extension.getBackgroundPage();
var playStatus = false;
var workStatus = false;

document.addEventListener('DOMContentLoaded', function () {
	$('.work').on('click', function(){
		workSwitcher();
		workStatus = !workStatus
		console.log(bgpage.workClicker(workStatus, playStatus));
		if (playStatus === true) {
			playStatus = false
		}
	});

	$('.play').on('click', function(){
		playSwitcher();
		playStatus = !playStatus;
		console.log(bgpage.playClicker(playStatus, workStatus));
		if (workStatus === true){
			workStatus = false
		};
	});
});

setInterval(display, 100);

function display(){
	var workCount = bgpage.getWorkCount();
	var workMoment = moment().hour(0).minute(0).second(workCount).format('HH : mm : ss');
  $('#work_timer').text(workMoment);

	var playCount = bgpage.getPlayCount();
	var playMoment = moment().hour(0).minute(0).second(playCount).format('HH : mm : ss');
  $('#play_timer').text(playMoment);

  // if ( workCount % 2000 === 0 ) {
  // 	bgpage.workAlert();
  // } else if ( playCount % 1800000 === 0 ) {
  // 	bgpage.playAlert();
  // };
};

function playSwitcher(){
	if (workStatus && playStatus){
		console.log("Something is definitely wrong here...")
	} else if (workStatus && !playStatus) {
		$('.work').attr('id', 'stopped')
		$('.play').attr('id', 'started')
	} else if (!workStatus && playStatus) {
		$('.play').attr('id', 'stopped')
	} else {
		$('.play').attr('id', 'started')
	}
};

function workSwitcher(){
	if (workStatus && playStatus){
		console.log("Something is definitely wrong here...")
	} else if (workStatus && !playStatus) {
		$('.work').attr('id', 'stopped')
	} else if (!workStatus && playStatus) {
		$('.play').attr('id', 'stopped')
		$('.work').attr('id', 'started')
	} else {
		$('.work').attr('id', 'started')
	}
};
